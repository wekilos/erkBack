var Sequelize = require("sequelize");
var Gozleg = require("../models/Gozleg");
var sequelize = require("../../config/db");
let fs = require("fs");
const Users = require("../models/user");
const Op = Sequelize.Op;


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


  const Tapyldy = (req,res)=>{
      const {gozleg_id} = req.params;
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

  const Tapylmady = (req,res)=>{
    const {gozleg_id} = req.params;
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

  exports.Tapyldy = Tapyldy;
  exports.Tapylmady = Tapylmady;

  exports.Delete = Delete;