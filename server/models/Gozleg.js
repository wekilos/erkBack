// import sequelize 
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
const Users = require("./user");

var Gozleg = sequelize.define(
    "Gozleg",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        product_name:Sequelize.STRING,
        sany:Sequelize.INTEGER,
        baha:Sequelize.DOUBLE,
        ordered_date:Sequelize.DATE,
        onumchilik_mohleti:Sequelize.DATE,
        saytlar:Sequelize.STRING,
        product_image:Sequelize.STRING,
        surat2:Sequelize.STRING,
        surat3:Sequelize.STRING,
        surat4:Sequelize.STRING,
        surat5:Sequelize.STRING,
        surat6:Sequelize.STRING,
        goshmachaTalaplar:Sequelize.TEXT,
        ordered:{type:Sequelize.BOOLEAN,default:false},
        tapylmady:{type:Sequelize.BOOLEAN,default:false},
    },
    {
        timestamps: true,
    }
);


Gozleg.belongsTo(Users);
Users.hasMany(Gozleg);


module.exports = Gozleg;