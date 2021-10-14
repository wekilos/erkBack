var Sequelize = require("sequelize");

const DATABASE = process.env.DATABASE || 'erkdb';
const USERNAME = process.env.USERNAME || 'postgres';
const PASSWORD = process.env.PASSWORD || '';
const HOST = process.env.HOST ;

// LalaGreenBazar112
const sequelize = new Sequelize("erkdb", "postgres", "", {
  host:  'localhost',
  port: "5432",
  dialect: "postgres",
})

module.exports = sequelize;

