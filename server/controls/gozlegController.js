var Sequelize = require("sequelize");
var Gozleg = require("../models/Gozleg");
var sequelize = require("../../config/db");
let fs = require("fs");
const Users = require("../models/user");
const Op = Sequelize.Op;
const {sendEmailtoUser} =require("../../config/email");

 const gozleg_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Gozleg.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };


  const getAllGozleg = async(req,res)=>{
    const { all } = req.query;
    console.log("all,statusesId",all);
    let all1 = parseInt(all);
    var All = all1
      ? {
        [Op.or]: [
          { id: { [Op.eq]: all } },
          { baha: { [Op.eq]: all } },
        ],
        }
      : null;

  Gozleg.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {ordered:false},
        {tapylmady:false},All
      ]
    },
    order: [
      ['id', 'DESC'],
  ]
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })

  }

  const getAllGozlegTapylmady = async(req,res)=>{
    const { all } = req.query;
    console.log("all,statusesId",all);
    let all1 = parseInt(all);
    var All = all1
      ? {
        [Op.or]: [
          { id: { [Op.eq]: all } },
          { baha: { [Op.eq]: all } },
        ],
        }
      : null;

  Gozleg.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {ordered:false},
        {tapylmady:true},All
      ]
    },
    order: [
      ['id', 'DESC'],
  ]
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })

  }

  const getAllGozlegTapyldy = async(req,res)=>{
    const { all } = req.query;
    console.log("all,statusesId",all);
    let all1 = parseInt(all);
    var All = all1
      ? {
        [Op.or]: [
          { id: { [Op.eq]: all } },
          { baha: { [Op.eq]: all } },
        ],
        }
      : null;

  Gozleg.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {ordered:true},
        {tapylmady:false},All
      ]
    },
    order: [
      ['id', 'DESC'],
  ]
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })

  }

  const create = async(req,res)=>{
    const { user_id } = req.params;
    const data = req.body;
    const data1 = req.files;
    
    let img_direction="";
    let surat2 = "";
    let surat3 ="";
    if(req.files && req.files.surat1){
      let randomNumber = Math.floor(Math.random() * 999999999999);
      img_direction = `./uploads/`+randomNumber+`${data1.surat1.name}`;
      data1.surat1.mv(img_direction, (err) => {
        console.log(err);
      })
    }
    if(req.files && req.files.surat2){
      let randomNumber2 = Math.floor(Math.random() * 999999999999);
      surat2 = `./uploads/`+randomNumber2+`${data1.surat2.name}`;
      data1.surat2.mv(surat2, (err) => {
        console.log(err);
      });
    }
    if(req.files && req.files.surat3){
      let randomNumber3 = Math.floor(Math.random() * 999999999999);
      surat3 = `./uploads/`+randomNumber3+`${data1.surat3.name}`;
      data1.surat3.mv(surat3, (err) => {
        console.log(err);
      });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
  
    let today = new Date();
    today.setHours(today.getHours()+5);

    Gozleg.create({
        product_name:data.product_name,
        sany:data.sany,
        baha:data.baha,
        ordered_date:today,
        onumchilik_mohleti:data.onumchilik_mohleti,
        saytlar:data.saytlar,
        product_image:img_direction,
        surat2:surat2,
        surat3:surat3,
        goshmachaTalaplar:data.goshmachaTalaplar,
        ordered:false,
        tapylmady:false,
        UserId:user_id,
    }).then(()=>{
        res.status(200).json({
            msg:"successfully"
        })
    }).catch((err)=>{
        console.log(err);
    })
    
  }

  const UpdateAdmin = async(req,res)=>{
    const { gozleg_id } = req.params;
    const data = req.body;
    const data1=req.files;
    
    let surat4="";
    let surat5 = "";
    let surat6 ="";
    if(req.files && req.files.surat4){
      let randomNumber = Math.floor(Math.random() * 999999999999);
      surat4 = `./uploads/`+randomNumber+`${data1.surat4.name}`;
      data1.surat4.mv(surat4, (err) => {
        console.log(err);
      })
    }
    if(req.files && req.files.surat5){
      let randomNumber2 = Math.floor(Math.random() * 999999999999);
      surat5 = `./uploads/`+randomNumber2+`${data1.surat5.name}`;
      data1.surat5.mv(surat5, (err) => {
        console.log(err);
      });
    }
    if(req.files && req.files.surat6){
      let randomNumber3 = Math.floor(Math.random() * 999999999999);
      surat6 = `./uploads/`+randomNumber3+`${data1.surat6.name}`;
      data1.surat6.mv(surat6, (err) => {
        console.log(err);
      });
    }
   
   
    ///////////////////////////////////////////////////////////////////////////////////////////
  
    let today = new Date();

    Gozleg.update({
        surat4:surat4,
        surat5:surat5,
        surat6:surat6
    },{
      where:{
        id:gozleg_id
      }
    }
    ).then(()=>{
        res.status(200).json({
            msg:"successfully"
        })
    }).catch((err)=>{
        console.log(err);
    })
    
  }


  const Tapyldy = async(req,res)=>{
      const {gozleg_id} = req.params;

      const FoundGozleg = await Gozleg.findOne({where:{id:gozleg_id}});
      const UserData = await Users.findOne({where:{id:FoundGozleg.UserId}});
      let userMail = UserData.email;
      let subject = "Erk Trading Gözlegdäki haryt"
      let text = `Siziň Gözlegdäki ${FoundGozleg.product_name} harydyňyz tapyldy! \n\n Ваш поисковый запрос ${FoundGozleg.product_name} найден!`;
      await sendEmailtoUser({
        userMail,
        subject,
        text,
      });

      Gozleg.update({
          ordered:true,
      },
      {
          where:{
          id:gozleg_id,
         }
    }).then(()=>{
        res.json({
            msg:"successfully"
        })
    }).catch((err)=>{
        console.log(err);
    })
  }

  const Tapylmady = async(req,res)=>{
    const {gozleg_id} = req.params;

    const FoundGozleg = await Gozleg.findOne({where:{id:gozleg_id}});
    const UserData = await Users.findOne({where:{id:FoundGozleg.UserId}});
    let userMail = UserData.email;
    let subject = "Erk Trading Gözlegdäki haryt"
    let text = `Siziň Gözlegdäki ${FoundGozleg.product_name} harydyňyz tapylmady! \n\n Ваш поисковый запрос ${FoundGozleg.product_name} не найден!`;
    await sendEmailtoUser({
      userMail,
      subject,
      text,
    });
    Gozleg.update({
        tapylmady:true,
    },
    {
        where:{
        id:gozleg_id,
       }
  }).then(()=>{
      res.json({
          msg:"successfully"
      })
  }).catch((err)=>{
      console.log(err);
  })
}


const Delete = async(req,res)=>{
  const {gozleg_id} = req.params;

  const foundGozleg = await Gozleg.findOne({where:{id:gozleg_id}});
  if(foundGozleg){
    Gozleg.destroy({
      where:{
        id:gozleg_id
      }
    }).then((data)=>{
      res.json({
        msg:"successfully"
      })
    }).catch((err)=>{
      console.log(err);
    })
  }
}

  exports.gozleg_tb = gozleg_tb;

  exports.getAllGozleg = getAllGozleg;
  exports.getAllGozlegTapyldy = getAllGozlegTapyldy;
  exports.getAllGozlegTapylmady = getAllGozlegTapylmady;

  exports.create = create;
  exports.UpdateAdmin = UpdateAdmin;
  exports.Tapyldy = Tapyldy;
  exports.Tapylmady = Tapylmady;

  exports.Delete = Delete;