// import sequelize 
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var Config = sequelize.define(
    "Config",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        phoneNumber:Sequelize.BIGINT,
        mail:Sequelize.STRING,
    },
    {
        timestamps: true,
    }
);



module.exports = Config;