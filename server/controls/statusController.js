var Sequelize = require("sequelize");
var Status = require("../models/Status");
var sequelize = require("../../config/db");
var fs = require('fs');
const Op = Sequelize.Op;


 const status_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Status.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };

  const allStatus = async(req,res)=>{
    Status.findAll().then((data)=>{
      res.status(200).json(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const create = async(req,res)=>{
    const {name_tm,name_ru,description_tm,description_ru} = req.body;
    Status.create({
      name_tm:name_tm,
      name_ru:name_ru,
      description_tm:description_tm,
      description_ru:description_ru,
    }).then((data)=>{
      res.status(200).json({
        msg:"successfully",
        data:data,
      })
    }).catch((err)=>{
      console.log(err);
    })
  }

  const update = async(req,res)=>{
    const {status_id } = req.params;

    const foundStatus = await Status.findOne({where:{id:status_id}});
   if(foundStatus){
      Status.update({
        name_tm:name_tm,
        name_ru:name_ru,
        description_tm:description_tm,
        description_ru:description_ru,
      },
      {
        where:{
          id:status_id
        }
      }).then((data)=>{
        res.status(200).json({
          msg:"successfully"
        })
      }).catch((err)=>{
        console.log(err);
      })
  }else{
        res.status(200).json("BU ID boyuncha status tapylmady")
  }
}

  const Delete = async(req,res)=>{
    const { status_id } = req.params;
    const foundSorag = await Status.findOne({where:{id:status_id}});
   
    if(foundSorag){
      Status.destroy({
        where:{
          id:status_id
        }
      }).then((data)=>{
        res.json({
          msg:"Successfully!"
        })
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      res.json({
        msg:"Bu ID boyuncha Status yok!"
      })
    }
  }
  
  exports.status_tb = status_tb;
  
  exports.allStatus = allStatus;
  exports.create = create;
  exports.update = update;
  exports.Delete = Delete;

