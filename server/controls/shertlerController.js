var Sequelize = require("sequelize");
var Shertler = require("../models/Shertler");
var sequelize = require("../../config/db");
const Op = Sequelize.Op;


 const shertler_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Shertler.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };


  const allShertler = async(req,res)=>{
    Shertler.findAll().then((data)=>{
      res.status(200).json(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const create = async(req,res)=>{
    const { name_tm,name_ru,description_tm,description_ru,sene_tm,sene_ru, details_tm, details_ru,} = req.body;
    Shertler.create({
      name_tm,
      name_ru,
      description_tm,
      description_ru,
      sene_tm,
      sene_ru,
      details_tm,
      details_ru,
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
    const {shert_id } = req.params;
    const { name_tm,name_ru,description_tm,description_ru,sene_tm,sene_ru, details_tm, details_ru, } = req.body;
    Shertler.update({
      name_tm,
      name_ru,
      description_tm,
      description_ru,
      sene_tm,
      sene_ru,
      details_tm,
      details_ru,
    },
    {
      where:{
        id:shert_id
      }
    }).then((data)=>{
      res.status(200).json({
        msg:"successfully"
      })
    }).catch((err)=>{
      console.log(err);
    })
  }

  const Delete = async(req,res)=>{
    const { shert_id } = req.params;
    const foundSorag = await Shertler.findOne({where:{id:shert_id}});

    if(foundSorag){
      Shertler.destroy({
        where:{
          id:shert_id
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
        msg:"Bu ID boyuncha sorag yok!"
      })
    }
  }

  exports.shertler_tb = shertler_tb;

  exports.allShertler = allShertler;
  exports.create = create;
  exports.update = update;
  exports.Delete = Delete;



