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
    }
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
    }
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
    }
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })

  }

  const create = async(req,res)=>{
    const { user_id } = req.params;
    const data = req.body.data;
    // getting base64 image and converting to buffer
    function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
    
      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');
    
      return response;
    }
    let img_direction="";
    let surat2 = "";
    let surat3 ="";
    if(data.surat1){
      var imageBuffer = decodeBase64Image(req.body.data.surat1.img);
       // converting buffer to original image to /upload folder
      let randomNumber = Math.floor(Math.random() * 999999999999);
      console.log("random Number:",randomNumber);
      img_direction = `./uploads/`+randomNumber+`${req.body.data.surat1.img_name}`;
      fs.writeFile(img_direction, imageBuffer.data, function(err) { console.log(err) });
    }
    if(data.surat2){
      var imageBuffer2 = decodeBase64Image(data.surat2.img);
       // converting buffer to original image to /upload folder
      let randomNumber2 = Math.floor(Math.random() * 999999999999);
      console.log("random Number:",randomNumber2);
      surat2 = `./uploads/`+randomNumber2+`${data.surat2.img_name}`;
      fs.writeFile(surat2, imageBuffer2.data, function(err) { console.log(err) });
    }
    if(data.surat3){
      var imageBuffer3 = decodeBase64Image(data.surat3.img);
       // converting buffer to original image to /upload folder
      let randomNumber3 = Math.floor(Math.random() * 999999999999);
      console.log("random Number:",randomNumber3);
      surat3 = `./uploads/`+randomNumber3+`${data.surat3.img_name}`;
      fs.writeFile(surat3, imageBuffer3.data, function(err) { console.log(err) });
    }
   
    ///////////////////////////////////////////////////////////////////////////////////////////
  
    let today = new Date();

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
    const data = req.body.data;
    // getting base64 image and converting to buffer
    function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
    
      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');
    
      return response;
    }
    let surat4="";
    let surat5 = "";
    let surat6 ="";
    if(data.surat4){
      var imageBuffer = decodeBase64Image(req.body.data.surat4.img);
       // converting buffer to original image to /upload folder
      let randomNumber = Math.floor(Math.random() * 999999999999);
      console.log("random Number:",randomNumber);
      surat4 = `./uploads/`+randomNumber+`${req.body.data.surat4.img_name}`;
      fs.writeFile(surat4, imageBuffer.data, function(err) { console.log(err) });
    }
    if(data.surat5){
      var imageBuffer5 = decodeBase64Image(data.surat5.img);
       // converting buffer to original image to /upload folder
      let randomNumber5 = Math.floor(Math.random() * 999999999999);
      console.log("random Number:",randomNumber5);
      surat2 = `./uploads/`+randomNumber5+`${data.surat5.img_name}`;
      fs.writeFile(surat5, imageBuffer5.data, function(err) { console.log(err) });
    }
    if(data.surat6){
      var imageBuffer6 = decodeBase64Image(data.surat6.img);
       // converting buffer to original image to /upload folder
      let randomNumber6 = Math.floor(Math.random() * 999999999999);
      console.log("random Number:",randomNumber6);
      surat6 = `./uploads/`+randomNumber6+`${data.surat6.img_name}`;
      fs.writeFile(surat6, imageBuffer6.data, function(err) { console.log(err) });
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