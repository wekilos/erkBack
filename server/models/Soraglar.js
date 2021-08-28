// import sequelize 
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var Soraglar = sequelize.define(
    "Soraglar",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name_tm:Sequelize.STRING(),
        name_ru:Sequelize.STRING(),
        description_tm:Sequelize.TEXT,
        description_ru:Sequelize.TEXT,
        question_tm:Sequelize.TEXT,
        question_ru:Sequelize.TEXT,
    },
    {
        timestamps: true,
    }
);



module.exports = Soraglar;