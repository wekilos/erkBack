var Sequelize = require("sequelize");
var Sargytlar = require("../models/Sargytlar");
var sequelize = require("../../config/db");
let fs = require("fs");
const Users = require("../models/user");
const Op = Sequelize.Op;


 const sargytlar_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Sargytlar.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };


  const allSartgyt = async(req,res)=>{
      const { all, statusId,yol } = req.query;
      console.log("all,statusesId",all,statusId);
      let all1 = parseInt(all);
      var All = all1
        ? {
          [Op.or]: [
            { id: { [Op.eq]: all } },
            { total_price: { [Op.eq]: all } },
          ],
          }
        : null;

    var StatusId = statusId
        ? {
          statusId: { [Op.eq]: statusId },
          }
        : null;
    var Yol = yol
        ? {
          yol: { [Op.eq]: yol },
          }
        : null;

    Sargytlar.findAll({
      include:[{
        model:Users,
        attributes: ["id","name","lastname","phoneNumber","email"]
      }],
      where:{
        [Op.and]:[
          {delivered:false},
          {yatyryldy:false},Yol,All,StatusId
        ]
      }
    }).then((data)=>{
      res.status(200).json(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const allSartgytDelivered = async(req,res)=>{
    const { all,statusId,yol } = req.query;
    console.log("all,statusesId",all);
    let all1 = parseInt(all);
    var All = all1
    ? {
      [Op.or]: [
        { id: { [Op.eq]: all } },
        { total_price: { [Op.eq]: all } },
      ],
      }
    : null;

var StatusId = statusId
    ? {
      statusId: { [Op.eq]: statusId },
      }
    : null;
var Yol = yol
    ? {
      yol: { [Op.eq]: yol },
      }
    : null;

  Sargytlar.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {delivered:true},Yol,All,StatusId
      ]
    }
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })
}

const allSargytYatyryldy = async(req,res)=>{
  const { all,statusId,yol } = req.query;
  console.log("all,statusesId",all);
  let all1 = parseInt(all);
  var All = all1
  ? {
    [Op.or]: [
      { id: { [Op.eq]: all } },
      { total_price: { [Op.eq]: all } },
    ],
    }
  : null;

var StatusId = statusId
  ? {
    statusId: { [Op.eq]: statusId },
    }
  : null;
var Yol = yol
  ? {
    yol: { [Op.eq]: yol },
    }
  : null;

Sargytlar.findAll({
  include:[{
    model:Users,
    attributes: ["id","name","lastname","phoneNumber","email"]
  }],
  where:{
    [Op.and]:[
      {yatyryldy:true},All,StatusId,Yol
    ]
  }
}).then((data)=>{
  res.status(200).json(data);
}).catch((err)=>{
  console.log(err);
})
}

const getAllUserSargytlar = async(req,res)=>{
  const {user_id} = req.params
  Sargytlar.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {delivered:false},
        {yatyryldy:false},
        {UserId:user_id}
      ]
    }
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })
}

const getAllUserSargytlarDone = async(req,res)=>{
  const {user_id} = req.params
  Sargytlar.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {
          [Op.or]:[
          {delivered:true},
          {yatyryldy:true},
        ]},
        {UserId:user_id}
      ]
    }
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })
}


const getUserOneSargyt = async(req,res)=>{
  const {sargyt_id} = req.params;
  Sargytlar.findOne({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      id:sargyt_id
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
  let surat4 = "";
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
  if(data.surat4){
    var imageBuffer4 = decodeBase64Image(data.surat4.img);
     // converting buffer to original image to /upload folder
    let randomNumber4 = Math.floor(Math.random() * 999999999999);
    console.log("random Number:",randomNumber4);
    surat4 = `./uploads/`+randomNumber4+`${data.surat4.img_name}`;
    fs.writeFile(surat4, imageBuffer4.data, function(err) { console.log(err) });
  }
 
  ///////////////////////////////////////////////////////////////////////////////////////////

  let today = new Date();
  console.log(data);
  Sargytlar.create({
    yol:data.yol,
    ugradyjy_ady:data.ugradyjy_ady,
    kabulediji_ady:data.kabulediji_ady,
    phoneNumber:data.phoneNumber,
    product_name:data.product_name,
    guty_sany:data.guty_sany,
    kg:data.kg,
    m3:data.m3,
    total_price:data.total_price,
    ordered_date:today,
    gowshurylmaly_date:null,
    status_date:today,
    product_image:img_direction,
    surat2:surat2,
    surat3:surat3,
    surat4:surat4,
    yukHazir:null,
    delivered:false,
    yatyryldy:false,
    UserId:user_id,
    // StatusId:null,
    statusId:null,
  }).then((data)=>{
    res.json({
      msg:"successfully",
      data:data,
    })
  }).catch((err)=>{
    console.log(err);
  })
}


const update = async(req,res)=>{
  const { sargyt_id } = req.params;
  const data = req.body.data;
  const olData = await Sargytlar.findOne({where:{id:sargyt_id}});
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
  if(req.body.data.img){
    var imageBuffer = decodeBase64Image(req.body.data.img);
     // converting buffer to original image to /upload folder
    let randomNumber = Math.floor(Math.random() * 999999999999);
    console.log("random Number:",randomNumber);
    let img_direction = `./uploads/`+randomNumber+`${req.body.data.img_name}`;
    fs.writeFile(img_direction, imageBuffer.data, function(err) { console.log(err) });
  }else{
    img_direction=olData.product_image;
  }
  if(data.surat2){
    var imageBuffer2 = decodeBase64Image(data.surat2);
     // converting buffer to original image to /upload folder
    let randomNumber2 = Math.floor(Math.random() * 999999999999);
    console.log("random Number:",randomNumber2);
    let surat2 = `./uploads/`+randomNumber2+`${data.surat2}`;
    fs.writeFile(surat2, imageBuffer2.data, function(err) { console.log(err) });
  }else{
    surat2=olData.surat2;
  }
  if(data.surat3){
    var imageBuffer3 = decodeBase64Image(data.surat3);
     // converting buffer to original image to /upload folder
    let randomNumber3 = Math.floor(Math.random() * 999999999999);
    console.log("random Number:",randomNumber3);
    let surat3 = `./uploads/`+randomNumber3+`${data.surat3}`;
    fs.writeFile(surat3, imageBuffer3.data, function(err) { console.log(err) });
  }else{
    surat3=olData.surat3;
  }
  if(data.surat4){
    var imageBuffer4 = decodeBase64Image(data.surat4);
     // converting buffer to original image to /upload folder
    let randomNumber4 = Math.floor(Math.random() * 999999999999);
    console.log("random Number:",randomNumber4);
    let surat4 = `./uploads/`+randomNumber4+`${data.surat4}`;
    fs.writeFile(surat4, imageBuffer4.data, function(err) { console.log(err) });
  }else{
    surat4=olData.surat4;
  }
 
  ///////////////////////////////////////////////////////////////////////////////////////////


  Sargytlar.update({
    yol:data.yol,
    ugradyjy_ady:data.ugradyjy_ady,
    kabulediji_ady:data.kabulediji_ady,
    phoneNumber:data.phoneNumber,
    product_name:data.product_name,
    guty_sany:data.guty_sany,
    kg:data.kg,
    m3:data.m3,
    total_price:data.total_price,
    ordered_date:data.ordered_date,
    gowshurylmaly_date:data.gowshurylmaly_date,
    status_date:data.status_date,
    product_image:img_direction,
    surat2:surat2,
    surat3:surat3,
    surat4:surat4,
    yukHazir:data.yukHazir,
  },{
    where:{id:sargyt_id}
  }).then((data)=>{
    res.json({
      msg:"successfully",
      data:data,
    })
  }).catch((err)=>{
    console.log(err);
  })
}


const updateStatus = async(req,res)=>{
  const {sargyt_id} = req.params;
  const {status_id,yukHazir} = req.body;

  const foundSargyt = await Sargytlar.findOne({where:{id:sargyt_id}});
  let today = new Date();
  if(foundSargyt){
    Sargytlar.update({
      statusId:status_id,
      yukHazir,
      status_date:today
    },{
      where:{
        id:sargyt_id
      }
    }).then((data)=>{
      res.status(200).json({
        msg:"successfully"
      })
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    res.json("bu Id boyuncha sargyt tapylmady!")
  }
}

const YukGowshuryldy = async(req,res)=>{
  const {sargyt_id} = req.params;
  const fountSargyt = await Sargytlar.findOne({where:{id:sargyt_id}});
  let today = new Date();
  if(fountSargyt){
    Sargytlar.update({
      delivered:true,
      gowshurylmaly_date:today,
    },{
      where:{
        id:sargyt_id
      }
    }).then((data)=>{
      res.json({
        msg:"successfully"
      })
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    res.json("bu Id boyuncha sargyt Tapylmady!")
  }
}

const SargytYatyryldy = async(req,res)=>{
  const {sargyt_id} = req.params;
  const fountSargyt = await Sargytlar.findOne({where:{id:sargyt_id}});
  let today = new Date();
  if(fountSargyt){
    Sargytlar.update({
      yatyryldy:true,
      gowshurylmaly_date:today,
    },{
      where:{
        id:sargyt_id
      }
    }).then((data)=>{
      res.json({
        msg:"successfully"
      })
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    res.json("bu Id boyuncha sargyt Tapylmady!")
  }
}

const Delete = async(req,res)=>{
  const { sargyt_id } = req.params;
  Sargytlar.destroy({
    where:{id:sargyt_id}
  }).then((data)=>{
    res.json({
      msg:"successfully"
    })
  }).catch((err)=>{
    console.log(err);
  })
}


  exports.sargytlar_tb = sargytlar_tb;

  exports.allSartgyt = allSartgyt;
  exports.allSartgytDelivered = allSartgytDelivered;
  exports.allSargytYatyryldy = allSargytYatyryldy;

  exports.getAllUserSargytlar = getAllUserSargytlar;
  exports.getAllUserSargytlarDone = getAllUserSargytlarDone; 
  exports.getUserOneSargyt = getUserOneSargyt;

  exports.create = create;
  exports.update = update;
  exports.updateStatus =updateStatus;
  exports.YukGowshuryldy = YukGowshuryldy;
  exports.SargytYatyryldy = SargytYatyryldy;
  exports.Delete = Delete;
