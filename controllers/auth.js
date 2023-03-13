const User = require("../models/user");
const UserToken = require("../models/userToken");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const moment= require('moment') 
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup =  (req,res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  const hash = bcrypt.hashSync(req.body.password, 10);
  user_data = {
    password : hash,
    email: req.body.email,
    first_name :req.body.first_name,
    last_name :req.body.last_name,
    company_name:req.body.company_name,
    phone_number:req.body.phone_number,
    street:req.body.street,
    house_number:req.body.house_number,
    postal_code:req.body.postal_code,
    city:req.body.city,
    land:req.body.land,
    sales_tax_id:req.body.sales_tax_id
  }

  
  User.create(user_data).then(async user => {

    res.json({message : "Sign Up Successfully."
   
  });
  }).catch((err)=>{
    return res.status(400).json({
        message : "Unable to save in db",
        error : err 
    })
  })   
  
}; 

exports.signin = (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  if(req.body.role!='admin'){
  const {email} = req.body;
  role ='user';
  const status =1;
  User.findOne({email,role,status}, function(err, user) {
    
   if (!user) {
      res.json({error:'User Not Found'});
   } else {
    bcrypt.compare(req.body.password, user.password, async function (err, result) {
      if (result == true) {
          //create token          
          
        var token = jwt.sign({ _id: user._id,email:user.email,role:user.role }, process.env.SECRET,{ expiresIn: '1d'  });
        user_email = user.email;
        user_role = user.role;
        user_name = user.first_name +' '+ user.last_name; 

        

      await UserToken.create({token:token}).then( usertoken => {
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred."
        });
      });
      await UserToken.deleteOne({ createdAt:{$lte:moment().subtract(2, 'days').toDate()} });

        res.json({token,user:{user_name,user_email,user_role}});
      } else {
        res.json({error:"Incorrect Password"});
      }
    });
  }
}).catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred."
  });
});

  }else{
    const {email,role} = req.body;
    const status =1;
    User.findOne({email,role,status}, function(err, user) {
      
     if (!user) {
        res.json({error:'User Not Found'});
     } else {
      bcrypt.compare(req.body.password, user.password, async function (err, result) {
        if (result == true) {
            //create token          
          var token = jwt.sign({ _id: user._id,email:user.email,role:user.role }, process.env.SECRET,{ expiresIn: '1d'  });
          user_email = user.email;
  
          
  
        await UserToken.create({token:token}).then( usertoken => {
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred."
          });
        });
        await UserToken.deleteOne({ created_at:{$lte:moment().subtract(2, 'days').toDate()} });
  
          res.json({token,user:{user_email}});
        } else {
          res.json({error:"Incorrect Password"});
        }
      });
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred."
    });
  }); 
  }


}




  exports.forget_password =  (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error : errors.array()
        })
    }
    guid = uuidv4();
  token = guid.replace(/-/g,""); 
  
    content =  { 
      password_reset_token: token,
      password_reset_time : Date.now()
    }
    User.findOne({email: req.body.email}).then(function  (user) {
     if (!user) {
        res.json({error:'User Not Found'});
     } else {
      User.findOneAndUpdate(
        {email: req.body.email},
        {$set : content},
        {new: true},
        async (err,calender) =>  {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            if(calender===null){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
          //url = process.env.BASE_URL+'api/confirm-password/'
      url = 'https://enmel.pamsar.com/reset-password/'+token
      try {
        await sendGridMail.send(forgetpassword_email(req.body.email,url));
       
       console.log('Test email sent successfully');
        res.send({url:url,message:'Email Send Successfully'});
      } catch (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while generating reset password."
        });
        
      }              
        })
  } })
  .catch(err => {
    res.status(500).send({
      message:err.message 
    });
  });
  } 

  exports.change_password = (req,res)=>{
    const password_reset_token = req.params.password_reset_token;
    User.findOne({password_reset_token: password_reset_token, password_reset_time: { $gt: new Date(Date.now() - 0*60*60 * 1000) }}).then(function (user) {
     if (!user) {
        res.json({error:'Token Expire or Incorrect'});
     } else { 
      const hash = bcrypt.hashSync(req.body.password, 10);
      content =  { 
        password: hash,
        password_reset_token: ""
      }
      

      User.findOneAndUpdate(
        {email:req.body.email},
        {$set : content},
        {new: true},
        (err,user) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            if(user===null){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
    
            res.send({message:'Password Changed Successfully.'});
        }
        )


     }
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating password."
      });
    });
  }



  function forgetpassword_email(email,url) {
    
    const body = `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title></title> 
    
        <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" rel="stylesheet">
    
        <style>
    
            html,
    body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
    }
    
    
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
    
    
    div[style*="margin: 16px 0"] {
        margin: 0 !important;
    }
    
    
    table,
    td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
    }
    
    
    table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
    }
    
    
    img {
        -ms-interpolation-mode:bicubic;
    }
    
    
    a {
        text-decoration: none;
    }
    
    
    *[x-apple-data-detectors],  /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    
    .a6S {
        display: none !important;
        opacity: 0.01 !important;
    }
    
    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
        color: inherit !important;
    }
    
    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img + div {
        display: none !important;
    }
    
    
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
    
    
        </style>
    
        <style>
    
          .primary{
      background: #17bebb;
    }
    .bg_white{
      background: #ffffff;
    }
    .bg_light{
      background: #f7fafa;
    }
    .bg_black{
      background: #000000;
    }
    .bg_dark{
      background: rgba(0,0,0,.8);
    }
    .email-section{
      padding:2.5em;
    }
    
    /*BUTTON*/
    .btn {
      padding: 10px 65px;
      display: inline-block;
    }
    .btn.btn-primary {
      border-radius: 0;
      background: #EC1C24;
      color: #ffffff;
    }
    
    h1,h2,h3,h4,h5,h6{
      font-family: 'Poppins', sans-serif;
      color: #000000;
      margin-top: 0;
      font-weight: 600;
    }
    
    body{
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.8;
      color:#555555;
    }
    a {
        color: #2C70F5;
        word-break: break-all;
    }
    
    table{
    }
    
    .hero{
      position: relative;
      z-index: 0;
    }
    
    .hero .text{
      color: rgba(0,0,0,.3);
    }
    .hero .text h2{
      color: #000;
      font-size: 34px;
      margin-bottom: 0;
      font-weight: 200;
      line-height: 1.4;
    }
    
    .text-inner {
      bordeR: 1px solid rgba(0,0,0,.05);
      max-width: 80%;
      margin: 0 auto;
      padding: 2em;
      background: #fff;
    }
    
    
    .social {
      margin: 0 5px;
    }
    .footer p{
    font-size:12px;
    }
    
    @media screen and (max-width: 500px) {
    
    
    }
    
    
        </style>
    
    
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
      <center style="width: 100%; background-color: #f1f1f1;">
        <div style="max-width: 768px; margin: 0 auto; background: #F7F9FD;" class="email-container">
    
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
            <tr>
              <td valign="top" style="padding: 1em 2.5em 0 2.5em;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td class="logo" style="text-align: center;">
                      <a href="#"><img src="${process.env.BASE_URL}/uploads/logo.png" alt="" title="" /></a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td valign="middle" class="hero" style="padding: 2em 0 2em 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="text-align: left;">
                      <div class="text-inner">				          	
                        <h2>Reset Your Password</h2>
                        <span class="name">Hi,</span>
    <p>To set up a new password to your Enmeldung account, click "Reset Your Password" below:</p>				           	
                         
                  
                  <p style="text-align: center;"><a href="${url}" class="btn btn-primary">Reset Password</a></p>
                  <p>If you didn’t request this, you can ignore this email or let us know. Your password won’t change untill you create a new password</p>
                       </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="footer" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
        <tr>
              <td class="" style="text-align: center; padding: 0 7%;">
                
    <p>© Copyright Enemeldung. All Rights Reserved. 2022</p>
              </td>
            </tr>
          </table>
    
        </div>
      </center>
    </body>
    </html>`;
    return {
      to: email,
      from: process.env.SENDGRID_FROM_ADDRESS,
      subject: 'Password Reset',
      text: body,
      html: `${body}`,
    };
  }
  

exports.logout = (req,res) =>{
  const token = req.headers["x-access-token"];
  UserToken.deleteOne({token: token}).then(function(rowDeleted){
   
    if(rowDeleted.deletedCount==1){
      res.status(200).send({
        message:"Logout Successfully"
      });
    }
    if(rowDeleted.deletedCount==0){
      res.status(200).send({
        message:"Not Found"
      });
    }
    
      res.status(401).send({
        message:"Something Went Wrong"
      });
    
 }, function(err){
  res.status(500).send({
    message:
      err.message || "Some error occurred."
  }); 
 });
}