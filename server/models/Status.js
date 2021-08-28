// import sequelize 
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var Status = sequelize.define(
    "Status",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name_tm:Sequelize.STRING(),
        name_ru:Sequelize.STRING(),
        description_tm:Sequelize.STRING(),
        description_ru:Sequelize.STRING(),
        surat:Sequelize.STRING(),
    },
    {
        timestamps: true,
    }
);



module.exports = Status;