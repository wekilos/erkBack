var Sequelize = require("sequelize");
var Sargytlar = require("../models/Sargytlar");
var sequelize = require("../../config/db");
let fs = require("fs");
var formidable = require('formidable');
const Users = require("../models/user");
const Op = Sequelize.Op;


 const sargytlar_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Sargytlar.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };


  const allSartgyt = async(req,res)=>{
      const { all, statusId,yol } = req.query;
      console.log("all,statusesId",all,statusId);
      let all1 = parseInt(all);
      var All = all1
        ? {
          [Op.or]: [
            { id: { [Op.eq]: all } },
            { total_price: { [Op.eq]: all } },
          ],
          }
        : null;

    var StatusId = statusId
        ? {
          statusId: { [Op.eq]: statusId },
          }
        : null;
    var Yol = yol
        ? {
          yol: { [Op.eq]: yol },
          }
        : null;

    Sargytlar.findAll({
      include:[{
        model:Users,
        attributes: ["id","name","lastname","phoneNumber","email"]
      }],
      where:{
        [Op.and]:[
          {delivered:false},
          {yatyryldy:false},Yol,All,StatusId
        ]
      },
      order: [
        ['id', 'DESC'],
    ]
    }).then((data)=>{
      res.status(200).json(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const allSartgytDelivered = async(req,res)=>{
    const { all,statusId,yol } = req.query;
    console.log("all,statusesId",all);
    let all1 = parseInt(all);
    var All = all1
    ? {
      [Op.or]: [
        { id: { [Op.eq]: all } },
        { total_price: { [Op.eq]: all } },
      ],
      }
    : null;

var StatusId = statusId
    ? {
      statusId: { [Op.eq]: statusId },
      }
    : null;
var Yol = yol
    ? {
      yol: { [Op.eq]: yol },
      }
    : null;

  Sargytlar.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {delivered:true},Yol,All,StatusId
      ]
    },
    order: [
      ['id', 'DESC'],
  ]
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })
}

const allSargytYatyryldy = async(req,res)=>{
  const { all,statusId,yol } = req.query;
  console.log("all,statusesId",all);
  let all1 = parseInt(all);
  var All = all1
  ? {
    [Op.or]: [
      { id: { [Op.eq]: all } },
      { total_price: { [Op.eq]: all } },
    ],
    }
  : null;

var StatusId = statusId
  ? {
    statusId: { [Op.eq]: statusId },
    }
  : null;
var Yol = yol
  ? {
    yol: { [Op.eq]: yol },
    }
  : null;

Sargytlar.findAll({
  include:[{
    model:Users,
    attributes: ["id","name","lastname","phoneNumber","email"]
  }],
  where:{
    [Op.and]:[
      {yatyryldy:true},All,StatusId,Yol
    ]
  },
  order: [
    ['id', 'DESC'],
]
}).then((data)=>{
  res.status(200).json(data);
}).catch((err)=>{
  console.log(err);
})
}

const getAllUserSargytlar = async(req,res)=>{
  const {user_id} = req.params;
  const { all } = req.query;
  console.log("all,statusesId",all);
  let all1 = parseInt(all);
  var All = all1
  ? {
    [Op.or]: [
      { id: { [Op.eq]: all } },
      { total_price: { [Op.eq]: all } },All
    ],
    }
  : null;
  Sargytlar.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {delivered:false},
        {yatyryldy:false},
        {UserId:user_id},All
      ]
    },
    order: [
      ['id', 'DESC'],
  ]
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })
}

const getAllUserSargytlarDone = async(req,res)=>{
  const {user_id} = req.params
  const { all } = req.query;
  console.log("all,statusesId",all);
  let all1 = parseInt(all);
  var All = all1
  ? {
    [Op.or]: [
      { id: { [Op.eq]: all } },
      { total_price: { [Op.eq]: all } },
    ],
    }
  : null;

  Sargytlar.findAll({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      [Op.and]:[
        {
          [Op.or]:[
          {delivered:true},
          {yatyryldy:true},
        ]},
        {UserId:user_id},All
      ]
    },
    order: [
      ['id', 'DESC'],
  ]
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })
}


const getUserOneSargyt = async(req,res)=>{
  const {sargyt_id} = req.params;
  Sargytlar.findOne({
    include:[{
      model:Users,
      attributes: ["id","name","lastname","phoneNumber","email"]
    }],
    where:{
      id:sargyt_id
    }   
  }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    console.log(err);
  })
}

const create = async(req,res)=>{
  const { user_id } = req.params;

  let data1=req.files;
  let data = req.body;

  let img_direction="";
  let surat2 = "";
  let surat3 ="";
  let surat4 = "";
  let surat5 = "";
  let surat6 = "";
  if(req.files && req.files.surat1){
    let randomNumber = Math.floor(Math.random() * 999999999999);
    img_direction = `./uploads/`+randomNumber+`${data1.surat1.name}`;
    data1.surat1.mv(img_direction, (err) => {
      console.log(err);
    })
  }
  if(req.files && req.files.surat2){
    let randomNumber2 = Math.floor(Math.random() * 999999999999);
    surat2 = `./uploads/`+randomNumber2+`${data1.surat2.name}`;
    data1.surat2.mv(surat2, (err) => {
      console.log(err);
    });
  }
  if(req.files && req.files.surat3){
    let randomNumber3 = Math.floor(Math.random() * 999999999999);
    surat3 = `./uploads/`+randomNumber3+`${data1.surat3.name}`;
    data1.surat3.mv(surat3, (err) => {
      console.log(err);
    });
  }
 
  // ///////////////////////////////////////////////////////////////////////////////////////////

  let today = new Date();
   today.setHours(today.getHours()+5);
  // console.log("todayyyy",today.getHours());
  Sargytlar.create({
    yol:data.yol,
    ugradyjy_ady:data.ugradyjy_ady,
    kabulediji_ady:data.kabulediji_ady,
    phoneNumber:data.phoneNumber,
    product_name:data.product_name,
    guty_sany:data.guty_sany,
    kg:data.kg,
    m3:data.m3,
    total_price:data.total_price,
    ordered_date:today,
    gowshurylmaly_date:null,
    status_date:today,
    product_image:img_direction,
    surat2:surat2,
    surat3:surat3,
    surat4:surat4,
    surat5:surat5,
    surat6:surat6,
    yukHazir:null,
    delivered:false,
    yatyryldy:false,
    UserId:user_id,
    // StatusId:null,
    statusId:null,
  }).then((data)=>{
    res.json({
      msg:"successfully",
      data:data,
    })
  }).catch((err)=>{
    console.log(err);
  })
}


const update = async(req,res)=>{
  const { sargyt_id } = req.params;
  const olData = await Sargytlar.findOne({where:{id:sargyt_id}});
  let data1=req.files;
  let data = req.body;

  let img_direction=" ";
  let surat2 = "";
  let surat3 ="";
  let surat4 = "";
  let surat5 = "";
  let surat6 = "";
  if(req.files && req.files.surat1){
    let randomNumber = Math.floor(Math.random() * 999999999999);
    img_direction = `./uploads/`+randomNumber+`${data1.surat1.name}`;
    data1.surat1.mv(img_direction, (err) => {
      console.log(err);
    })
  }else{
    img_direction=olData.img_direction;
  }
  if(req.files && req.files.surat2){
    let randomNumber2 = Math.floor(Math.random() * 999999999999);
    surat2 = `./uploads/`+randomNumber2+`${data1.surat2.name}`;
    data1.surat2.mv(surat2, (err) => {
      console.log(err);
    });
  }else{
    surat2=olData.surat2;
  }
  if(req.files && req.files.surat3){
    let randomNumber3 = Math.floor(Math.random() * 999999999999);
    surat3 = `./uploads/`+randomNumber3+`${data1.surat3.name}`;
    data1.surat3.mv(surat3, (err) => {
      console.log(err);
    });
  }else{
    surat3=olData.surat3;
  }
 
  // ///////////////////////////////////////////////////////////////////////////////////////////


  Sargytlar.update({
    yol:data.yol,
    ugradyjy_ady:data.ugradyjy_ady,
    kabulediji_ady:data.kabulediji_ady,
    phoneNumber:data.phoneNumber,
    product_name:data.product_name,
    guty_sany:data.guty_sany,
    kg:data.kg,
    m3:data.m3,
    total_price:data.total_price,
    ordered_date:data.ordered_date,
    gowshurylmaly_date:data.gowshurylmaly_date,
    status_date:data.status_date,
    product_image:img_direction,
    surat2:surat2,
    surat3:surat3,
    surat4:surat4,
    yukHazir:data.yukHazir,
  },{
    where:{id:sargyt_id}
  }).then((data)=>{
    res.json({
      msg:"successfully",
      data:data,
    })
  }).catch((err)=>{
    console.log(err);
  })
}


const UpdateAdmin = async(req,res)=>{
  const { sargyt_id } = req.params;
  let data1=req.files;
  
  let FountSargyt = await Sargytlar.findOne({where:{id:sargyt_id}});


  let surat4=FountSargyt.surat4;
  let surat5 = FountSargyt.surat5;
  let surat6 =FountSargyt.surat6;
  if(req.files && req.files.surat4){
    let randomNumber = Math.floor(Math.random() * 999999999999);
    surat4 = `./uploads/`+randomNumber+`${data1.surat4.name}`;
    data1.surat4.mv(surat4, (err) => {
      console.log(err);
    })
  }
  if(req.files && req.files.surat5){
    let randomNumber2 = Math.floor(Math.random() * 999999999999);
    surat5 = `./uploads/`+randomNumber2+`${data1.surat5.name}`;
    data1.surat5.mv(surat5, (err) => {
      console.log(err);
    });
  }
  if(req.files && req.files.surat6){
    let randomNumber3 = Math.floor(Math.random() * 999999999999);
    surat6 = `./uploads/`+randomNumber3+`${data1.surat6.name}`;
    data1.surat6.mv(surat6, (err) => {
      console.log(err);
    });
  }
 
  ///////////////////////////////////////////////////////////////////////////////////////////

console.log("surat5",surat5)
  Sargytlar.update({
      surat4:surat4,
      surat5:surat5,
      surat6:surat6
  },{
    where:{
      id:sargyt_id
    }
  }
  ).then(()=>{
      res.status(200).json({
          msg:"successfully"
      })
  }).catch((err)=>{
      console.log(err);
  })
  
}



const updateStatus = async(req,res)=>{
  const {sargyt_id} = req.params;
  const {status_id,yukHazir} = req.body;

  const foundSargyt = await Sargytlar.findOne({where:{id:sargyt_id}});
  
  const UserData = await Users.findOne({where:{id:foundSargyt.UserId}});

  let userMail = UserData.email;
    


  let today = new Date();
  if(foundSargyt){
    Sargytlar.update({
      statusId:status_id,
      yukHazir,
      status_date:today
    },{
      where:{
        id:sargyt_id
      }
    }).then((data)=>{
      res.status(200).json({
        msg:"successfully"
      });
      let subject = "Erk Trading"
    let text = "";
    if(status_id==1){text = "Siziň harydyňyzyň Gelmegine Garaşylýar! \n\n Ваш товар в ожидании!";}
    if(status_id==2){text = "Siziň harydyňyz Ammara geldi! \n\n Ваш товар Прибыл на склад!";}
    if(status_id==3){text = "Siziň Ýüküňiz ugradyldy! \n\n Ваш груз отправлен!";}
    if(status_id==4){text = "Siziň harydyňyz Ýolda! \n\n Ваш товар В пути!";}
    if(status_id==5){text = "Siziň harydyňyz Türkmenistanyň ammaryna geldi! \n\n Ваш товар Прибыл на склад в Туркменистан!";}
    if(status_id==6){text = "Siziň harydyňyz Gowşurma nokadyna ugradyldy! \n\n Ваш товар Отправлено в пункт доставки!";}
     sendEmailtoUser({
      userMail,
      subject,
      text,
    });
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    res.json("bu Id boyuncha sargyt tapylmady!")
  }
}

const YukGowshuryldy = async(req,res)=>{
  const {sargyt_id} = req.params;
  const fountSargyt = await Sargytlar.findOne({where:{id:sargyt_id}});
  let today = new Date();
  if(fountSargyt){
    Sargytlar.update({
      delivered:true,
      gowshurylmaly_date:today,
    },{
      where:{
        id:sargyt_id
      }
    }).then((data)=>{
      res.json({
        msg:"successfully"
      })
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    res.json("bu Id boyuncha sargyt Tapylmady!")
  }
}

const SargytYatyryldy = async(req,res)=>{
  const {sargyt_id} = req.params;
  const fountSargyt = await Sargytlar.findOne({where:{id:sargyt_id}});
  let today = new Date();
  if(fountSargyt){
    Sargytlar.update({
      yatyryldy:true,
      gowshurylmaly_date:today,
    },{
      where:{
        id:sargyt_id
      }
    }).then((data)=>{
      res.json({
        msg:"successfully"
      })
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    res.json("bu Id boyuncha sargyt Tapylmady!")
  }
}

const Delete = async(req,res)=>{
  const { sargyt_id } = req.params;
  Sargytlar.destroy({
    where:{id:sargyt_id}
  }).then((data)=>{
    res.json({
      msg:"successfully"
    })
  }).catch((err)=>{
    console.log(err);
  })
}


  exports.sargytlar_tb = sargytlar_tb;

  exports.allSartgyt = allSartgyt;
  exports.allSartgytDelivered = allSartgytDelivered;
  exports.allSargytYatyryldy = allSargytYatyryldy;

  exports.getAllUserSargytlar = getAllUserSargytlar;
  exports.getAllUserSargytlarDone = getAllUserSargytlarDone; 
  exports.getUserOneSargyt = getUserOneSargyt;

  exports.create = create;
  exports.update = update;
  exports.UpdateAdmin = UpdateAdmin;
  exports.updateStatus =updateStatus;
  exports.YukGowshuryldy = YukGowshuryldy;
  exports.SargytYatyryldy = SargytYatyryldy;
  exports.Delete = Delete;
