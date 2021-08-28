var Sequelize = require("sequelize");

const DATABASE = process.env.DATABASE || 'erk';
const USERNAME = process.env.USERNAME || 'postgres';
const PASSWORD = process.env.PASSWORD || '';
const HOST = process.env.HOST || '95.85.120.183';

const sequelize = new Sequelize("erk", "postgres", "", {
  host: HOST || 'localhost',
  port: "5432",
  dialect: "postgres",
})

module.exports = sequelize;