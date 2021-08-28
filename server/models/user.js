// import sequelize 
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var Users = sequelize.define(
    "Users",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:Sequelize.STRING,
        lastname:Sequelize.STRING,
        phoneNumber:Sequelize.BIGINT,
        password:Sequelize.STRING,
        email:Sequelize.STRING,
        type:Sequelize.INTEGER,
    },
    {
        timestamps: true,
    }
);



module.exports = Users;