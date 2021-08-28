// import sequelize 
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var Shertler = sequelize.define(
    "Shertler",
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
        sene_tm:Sequelize.TEXT,
        sene_ru:Sequelize.TEXT,
        details_tm:Sequelize.TEXT,
        details_ru:Sequelize.TEXT,
    },
    {
        timestamps: true,
    }
);



module.exports = Shertler;