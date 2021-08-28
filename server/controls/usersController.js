var Sequelize = require("sequelize");
var Users = require("../models/user");
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
const Op = Sequelize.Op;
const {sendEmailtoAllUser,sendEmail,sendEmailtoUser} =require("../../config/email");
const { INTEGER } = require("sequelize");


 const users_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Users.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };



  const list = async (req, res) => {
    var { all, typeId,number } = req.query;
    var Number = number 
     ? {
       phoneNumber:{[Op.eq] : parseInt(number) }
    }
    : null;
    var All = all
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${all}%` } },
            { lastname: { [Op.iLike]: `%${all}%` } },
            { email: { [Op.iLike]: `%${all}%` } },
          ],
        }
      : null;
  
    var TypeId = typeId
      ? {
          type: { [Op.eq]: `${typeId}` },
        }
      : null;

  
  
    Users.findAll({
  
      where: {
        [Op.and]: [All, TypeId, Number],
      },
      order: [["id", "ASC"]],
    }).then((data)=>{
      res.json(data);
    }).catch((err)=>{
      console.log(err);
      res.json("error!")
    })
  };


  const getOneUser = async(req,res)=>{
    const {user_id}=req.params;
    Users.findOne({where:{id:user_id}}).then((data)=>{
      res.json(data);
    }).catch((err)=>{
      console.log(err);
    })
  }


const create = async (req, res) => {
  
  const { name,lastname,phoneNumber,email,type,password } = req.body;
  console.log("data",req.body);
  const existUser = await Users.findOne({
    where:{
      phoneNumber:phoneNumber,
    }
  });

  const salt = bcrypt.genSaltSync();
  bcrypt.hash(password, salt, (err, hashpassword) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Error", err: err });
    } else {
      
  if(existUser){
    res.json({
      msg:"Bu nomurda ulanyjy öňden bar!"
    })
  }else{
    Users.create({
      name,
      lastname,
      phoneNumber,
      email,
      type,
      password:hashpassword
    }).then(async(data) => {
              
          jwt.sign(
            {
              id: data.id,
              role: data.type,
              name: data.name,
              phoneNumber:data.phoneNumber,
            },
            Func.Secret(),
            (err, token) => {
              res.status(200).json({
                msg: "Suссessfully",
                token: token,
                id:data.id,
                UserType:data.type,
                phoneNumber:data.phoneNumber,
              });
            }
          );
          }).catch((err)=>{
            console.log(err);
            console.log("error::::: ______________________________________________  Create User");
          })
      // res.json("succsess!")
    
  }


    }
  });

};

const login = async(req,res)=>{
  console.log("Login data ="+ JSON.stringify(req.body));

const { phoneNumber, password } = req.body;



 await Users.findOne({
  where: { phoneNumber: phoneNumber },
}).then(async(data)=>{

 if (await bcrypt.compare(password, data.password)) {
      const token = jwt.sign(
        { id: data.id, role:data.type, name: data.name, phoneNumber:data.phoneNumber },
        Func.Secret()
      );

      return res.json({
        id: data.id,
        name: data.name,
        token: token,
        type:data.type,
        login: true,
      });
    } else {
      res.send({
        msg: "Your username or password is invalid!",
        login: false,
      });
    }
  
}).catch((err)=> {
 
  res.send({ login: false, msg: "Hasaba alynmadyk ulanyjy!" });
}) 

}

const update_user = async (req, res) => {
  const {user_id} = req.params;
  const { name,lastname,email,type,password } = req.body;
  console.log("data",req.body);
  const existUser = await Users.findOne({
    where:{
      id:user_id,
    }
  });

  const salt = bcrypt.genSaltSync();
  bcrypt.hash(password, salt, (err, hashpassword) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Error", err: err });
    } else {
      
  if(!existUser){
    res.json({
      msg:"Bu nomurda ulanyjy yok."
    })
  }else{
    Users.update({
      name,
      lastname,
      email,
      type,
      password:hashpassword
    },{where:{id:user_id}}).then(async(data) => {
              
          jwt.sign(
            {
              id: data.id,
              role: data.type,
              name: data.name,
              phoneNumber:data.phoneNumber,
            },
            Func.Secret(),
            (err, token) => {
              res.status(200).json({
                msg: "Suссessfully",
                token: token,
                id:data.id,
                UserType:data.id,
                phoneNumber:data.phoneNumber,
              });
            }
          );
          }).catch((err)=>{
            console.log(err);
            console.log("error::::: ______________________________________________  Create User");
          })
      // res.json("succsess!")
    
  }


    }
  });

};


const delete_user = async(req,res)=>{
  const { user_id } = req.params;
  const foundUser = await Users.findOne({
    where:{
      id:user_id
    }
  });
  if(foundUser){
    Users.destroy({
      where:{
        id:user_id
      }
    }).then(()=>{
        res.status(200).json({
          msg: "Suссessfully",
      })
    }).catch((err)=>{
      console.log(err);
    });
  }else{
    res.json({
      msg:"Bu ID boyuncha user tapylmady!"
    })
  }
}


const SentMailtoAllUser = async(req,res)=>{

  const {users,subject,text} = req.body;
  await sendEmailtoAllUser({
    users,
    subject,
    text,
  });

  res.json("successfully");

}

const SentMailtoUser = async(req,res)=>{
 
  const {userMail,subject,text} = req.body;
  await sendEmailtoUser({
    userMail,
    subject,
    text,
  });
  
  res.json("successfully");
}

const UserSentMailtoAdmin = async(req,res)=>{
  const {name,email,text,subject} = req.body;
  
  await sendEmail({
    name,
    email,
    text,
    subject,
  });

  res.json("successfully");
}

  exports.users_tb = users_tb;

  exports.list =list;
  exports.getOneUser = getOneUser;
  exports.create = create;
  exports.login = login;
  exports.update_user = update_user;
  exports.delete_user = delete_user;

  exports.SentMailtoAllUser = SentMailtoAllUser;
  exports.SentMailtoUser = SentMailtoUser;
  exports.UserSentMailtoAdmin = UserSentMailtoAdmin;