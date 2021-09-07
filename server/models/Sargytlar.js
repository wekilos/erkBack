// import sequelize 
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
const Status = require("./Status");
const Users = require("./user");

var Sargytlar = sequelize.define(
    "Sargytlar",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        yol:Sequelize.INTEGER,
        ugradyjy_ady:Sequelize.STRING,
        kabulediji_ady:Sequelize.STRING,
        phoneNumber:Sequelize.BIGINT,
        product_name:Sequelize.STRING,
        guty_sany:Sequelize.INTEGER,
        kg:Sequelize.DOUBLE,
        m3:Sequelize.DOUBLE,
        total_price:Sequelize.DOUBLE,
        ordered_date:Sequelize.DATE,
        gowshurylmaly_date:Sequelize.DATE,
        status_date:Sequelize.DATE,
        product_image:Sequelize.STRING,
        surat2:Sequelize.STRING,
        surat3:Sequelize.STRING,
        surat4:Sequelize.STRING,
        surat5:Sequelize.STRING,
        surat6:Sequelize.STRING,
        yukHazir:Sequelize.STRING,
        delivered:{type:Sequelize.BOOLEAN,default:false},
        yatyryldy:{type:Sequelize.BOOLEAN,default:false},
        statusId:Sequelize.INTEGER,
    },
    {
        timestamps: true,
    }
);


Sargytlar.belongsTo(Users);
Users.hasMany(Sargytlar);

Sargytlar.belongsTo(Status);
Status.hasMany(Sargytlar);


module.exports = Sargytlar;