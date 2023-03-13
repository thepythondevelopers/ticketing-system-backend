const UserToken = require("../models/userToken");
const User = require("../models/user");
const Drag = require("../models/drag");
var jwt = require('jsonwebtoken');
exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({error:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    
    user_token = await UserToken.findOne({token: token});
    
   if (user_token === null) {
    return res.status(401).send({
      error : "Token Not Found"
    });
  }
  
  req.user = decoded;
  
  user = await User.findOne({_id: req.user._id,status:1});
  
  if (user === null) {
    return res.status(401).send({
      error : "User Account Deactive/Not Found"
    });
  }
  } catch (err_m) {
    return res.status(401).send({
      error : "Invalid Token",
      error_m :err_m
    });
  }
  return next();
};

exports.checkDragExist = async (req, res, next) => {
  
drag = await Drag.findOne({user:req.user._id,location: req.body.location});
if(drag!=null){
  return res.status(401).json({
    message : "Already Exist"
    })
  }
return next();  
}

exports.adminroleCheck = (req,res,next) =>{
  if(req.user.role!='admin'){
      return res.status(404).json({
          err  : "Does't Not have permission."
      })
  }  
  next();
}