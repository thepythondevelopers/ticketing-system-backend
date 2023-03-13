var express = require('express')
var router = express.Router()
const { check} = require("express-validator");
const User = require("../models/user");
const {signup,signin,forget_password,change_password,logout} = require("../controllers/auth");
const {verifyToken} = require("../middleware/auth");

router.post("/sign-up",[
    check("email").isLength({max : 255}).isEmail().custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({email:req.body.email}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
        });
      }).notEmpty(),
    check("password").isLength({max : 20}).notEmpty(),
    check("first_name").notEmpty(),
    check("last_name").notEmpty(),
    check("company_name").notEmpty(),
    check("phone_number").notEmpty(),
    check("street").notEmpty(),
    check("house_number").notEmpty(),
    check("postal_code").notEmpty(),
    check("city").notEmpty(),
    check("land").notEmpty(),
    check("sales_tax_id").notEmpty()
],signup);

router.post("/sign-in",[
    check("email").isLength({max : 255}).isEmail().notEmpty(),
      check("password").isLength({max : 255}).notEmpty(),
  ],signin);



   router.post("/forget-password",[
     check("email").isLength({max : 255}).isEmail().notEmpty()
   ],forget_password);
  
  router.post("/change-password/:password_reset_token",[
    check("token").notEmpty(),
    check("password").isLength({max : 255}).notEmpty(),
  ],change_password);
  
  
  
router.post("/logout",verifyToken,logout);


module.exports = router;
