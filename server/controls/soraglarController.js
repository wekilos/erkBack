var Sequelize = require("sequelize");
var Soraglar = require("../models/Soraglar");
var sequelize = require("../../config/db");
const Op = Sequelize.Op;


 const soraglar_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Soraglar.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };


  const allSoraglar = async(req,res)=>{
    Soraglar.findAll().then((data)=>{
      res.status(200).json(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const create = async(req,res)=>{
    const { name_tm,name_ru,description_tm,description_ru,question_tm,question_ru } = req.body;
    Soraglar.create({
      name_tm,
      name_ru,
      description_tm,
      description_ru,
      question_tm,
      question_ru
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
    const {sorag_id } = req.params;
    const { name_tm,name_ru,description_tm,description_ru,question_tm,question_ru } = req.body;
    Soraglar.update({
      name_tm,
      name_ru,
      description_tm,
      description_ru,
      question_tm,
      question_ru
    },
    {
      where:{
        id:sorag_id
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
    const { sorag_id } = req.params;
    const foundSorag = await Soraglar.findOne({where:{id:sorag_id}});

    if(foundSorag){
      Soraglar.destroy({
        where:{
          id:sorag_id
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

  exports.soraglar_tb = soraglar_tb;
  
  exports.allSoraglar = allSoraglar;
  exports.create = create;
  exports.update = update;
  exports.Delete = Delete;