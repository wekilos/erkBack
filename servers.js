const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const app = express();
const fileupload = require('express-fileupload')
const PORT = process.env.PORT || 4321;
 app.listen(PORT, () => console.log("listening on *:",PORT));
 
app.use(fileupload());
app.use("/uploads",express.static("uploads"));
app.use(bodyParser.json({limit: "1000mb"}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true,parameterLimit:50000}));
app.use(
  cors({
    origin:"*"
  })
);
// app.use(upload.single("surat"));
app.use((req, res, next) => {
  // const allowedOrigins = ["http://localhost:3000"];
  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   res.setHeader("Access-Control-Allow-Origin", origin);
  // }
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  //  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // res.header('Access-Control-Allow-Credentials', true);
  //  res.header('Access-Control-Allow-Credentials', true);
  next();
});

const Routers = require("./server/routes/routes");

app.use("/api", Routers);

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;

app.use("/", (req, res) => {
  res.send("404 page not found!");
});

 global.rootPath = __dirname;
module.exports = {
  app,
};
