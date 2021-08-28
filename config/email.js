const nodemailer = require('nodemailer');

exports.sendEmail = async ({name,email,text,subject}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'erktrading002@gmail.com',
      pass: 'rahym2012',
    },
  });

  const mailOptions = {
    from: `ErkTrading Contact-Us <erktrading002@gmail.com>`,
    to: 'erktrading002@gmail.com',
    subject: 'Biri "Erktrading" administratsiýasy bilen habarlaşmak isleýär',
    text: `SUBJECT: ${subject},\n\nADY: ${name},\n\nEMAIL: ${email},\n\nHATY: ${text}`,
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
};

exports.sendEmailtoAllUser = async ({ users, subject, text, }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'erktrading002@gmail.com',
      pass: 'rahym2012',
    },
  });

  users.forEach(async(user)=>{
    const mailOptions = {
      from: `ErkTrading <erktrading002@gmail.com>`,
      to: `${user.email}`,
      subject: `${subject}`,
      text: `${text}`,
    };

    await transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
})

};

exports.sendEmailtoUser = async ({ userMail, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'erktrading002@gmail.com',
      pass: 'rahym2012',
    },
  });

  console.log(userMail,subject,text);
    const mailOptions = {
      from: `erktrading002@gmail.com`,
      to: `${userMail}`,
      subject: `${subject}`,
      text: `${text}`,
    };

    await transporter.sendMail(mailOptions, function (err, info) {
      if(err){
        console.log(err)}
      else
        console.log(info);
   });


};