const express = require("express");
// const { verify } = require("crypto");
const Func = require("../functions/functions");
const sequelize = require("../../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cache = require('../../config/node-cache');
const path = require("path");


const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, path.join(global.rootPath,'uploads'));
//     console.log(file)
//   },
//   filename: function(req, file, cb) {
//     console.log(file,"fil in multer")
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || true) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   // limits: {
//   //   fileSize: 1024 * 1024 * 15
//   // },
//   fileFilter: fileFilter
// });

// Multer Properties
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });


// Controllers
const UserControllers = require("../controls/usersController");
const ShertlerController = require("../controls/shertlerController");
const ConfigController = require("../controls/configController");
const SoraglaController = require("../controls/soraglarController");
const StatusController = require("../controls/statusController");
const SargytlarController = require("../controls/sargytlarController");
const GozlegController = require("../controls/gozlegController");

// // Routes

router.get("/users_tb",UserControllers.users_tb);
router.get("/config_tb",ConfigController.config_tb);
router.get("/shertler_tb",ShertlerController.shertler_tb);
router.get("/soraglar_tb",SoraglaController.soraglar_tb);
router.get("/status_tb",StatusController.status_tb);
router.get("/sargytlar_tb",SargytlarController.sargytlar_tb);
router.get("/gozleg_tb",GozlegController.gozleg_tb);



// User route

router.get("/users",cache.get,UserControllers.list,cache.set);
router.get("/user/:user_id",cache.get,UserControllers.getOneUser,cache.set);
router.post("/user/create",UserControllers.create);
router.post("/user/login",UserControllers.login);
router.patch("/user/update/:user_id",UserControllers.update_user);
router.delete("/user/delete/:user_id",UserControllers.delete_user);

//Shertler routes 
router.get("/shertler",cache.get,ShertlerController.allShertler,cache.set);
router.post("/shert/create",ShertlerController.create);
router.patch("/shert/update/:shert_id",ShertlerController.update);
router.delete("/shert/delete/:shert_id",ShertlerController.Delete);

//Soraglar routes
router.get("/soraglar",cache.get,SoraglaController.allSoraglar,cache.set);
router.post("/sorag/create",SoraglaController.create);
router.patch("/sorag/update/:sorag_id",SoraglaController.update);
router.delete("/sorag/delete/:sorag_id",SoraglaController.Delete);

//Status routes
router.get("/statuslar",cache.get,StatusController.allStatus,cache.set);
router.post("/status/create",StatusController.create);
router.patch("/status/update/:status_id",StatusController.update);
router.delete("/status/delete/:status_id",StatusController.Delete);

//Config routes
router.get("/configs",cache.get,ConfigController.allConfig,cache.set);
router.post("/config/create",ConfigController.create);
router.patch("/config/update/:config_id",ConfigController.update);
router.delete("/config/delete/:config_id",ConfigController.Delete);

// Sargytlar routes
router.get("/sargytlar",cache.get,SargytlarController.allSartgyt,cache.set);
router.get("/sargytlar/delivered",cache.get,SargytlarController.allSartgytDelivered,cache.set);
router.get("/sargytlar/yatyryldy",cache.get,SargytlarController.allSargytYatyryldy,cache.set);

router.get("/sargytlar/:user_id",cache.get,SargytlarController.getAllUserSargytlar,cache.set);
router.get("/sargytlar/taryh/:user_id",cache.get,SargytlarController.getAllUserSargytlarDone,cache.set);
router.get("/sargyt/:sargyt_id",cache.get,SargytlarController.getUserOneSargyt,cache.set);

router.post("/sargyt/create/:user_id",SargytlarController.create);
router.patch("/sargyt/update/:sargyt_id",SargytlarController.update);
router.patch("/sargyt/update/admin/:sargyt_id",SargytlarController.UpdateAdmin);
router.patch("/sargyt/update/staus/:sargyt_id",SargytlarController.updateStatus);
router.patch("/sargyt/update/delivered/:sargyt_id",SargytlarController.YukGowshuryldy);
router.patch("/sargyt/update/yatyryldy/:sargyt_id",SargytlarController.SargytYatyryldy);
router.delete("/sargyt/delete/:sargyt_id",SargytlarController.Delete);


// Gozleg routes

router.get("/gozlegdakiler",cache.get,GozlegController.getAllGozleg,cache.set);
router.get("/tapylanlar",cache.get,GozlegController.getAllGozlegTapyldy,cache.set);
router.get("/tapylmadyklar",cache.get,GozlegController.getAllGozlegTapylmady,cache.set);

router.post("/gozleg/create/:user_id",GozlegController.create);
router.patch("/gozleg/update/:gozleg_id",GozlegController.UpdateAdmin);
router.patch("/tapyldy/:gozleg_id",GozlegController.Tapyldy);
router.patch("/tapylmady/:gozleg_id",GozlegController.Tapylmady);

router.delete("/gozleg/delete/:gozleg_id",GozlegController.Delete);


// mail sending 

router.post("/mail/send/allUser",UserControllers.SentMailtoAllUser);
router.post("/mail/send/user",UserControllers.SentMailtoUser);
router.post("/mail/sent/UsertoAdmin",UserControllers.UserSentMailtoAdmin);



// For Token

function verifyToken(req, res, next) {
    const bearerHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
  
      jwt.verify(bearerToken, Func.Secret(), (err, authData) => {
        if (err) {
          res.json("err");
          console.log(err);
          
        } else {
          req.id = authData.id;
        }
      });
      next();
    } else {
      res.send("<center><h2>This link was not found! :(</h2></center>");
    }
  }
  
  module.exports = router;