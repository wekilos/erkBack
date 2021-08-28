var Sequelize = require("sequelize");
var Config = require("../models/Config");
var sequelize = require("../../config/db");
const Op = Sequelize.Op;


 const config_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Config.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };

  const allConfig = async(req,res)=>{
    Config.findAll().then((data)=>{
      res.status(200).json(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const create = async(req,res)=>{
    const { phoneNumber, mail } = req.body;
    Config.create({
      phoneNumber,
      mail
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
    const {config_id } = req.params;
    const { phoneNumber, mail } = req.body;
    Config.update({
      phoneNumber,
      mail
    },
    {
      where:{
        id:config_id
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
    const { config_id } = req.params;
    const foundSorag = await Config.findOne({where:{id:config_id}});

    if(foundSorag){
      Config.destroy({
        where:{
          id:config_id
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

  
  exports.config_tb = config_tb;

  exports.allConfig = allConfig;
  exports.create = create;
  exports.update = update;
  exports.Delete = Delete;


