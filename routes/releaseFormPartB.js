const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createFormPartB,updateFormPartB,getSingleFormB,getFormBData,deleteFormB} = require("../controllers/releaseFormPartB");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/releaseform")
    },
    filename : function(req,file,cb){
      cb(null,Date.now()+file.originalname)
    }
  })
  
  const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
      cb(null,true)
    }else{
      cb(null,false)
    }
  }
  var upload = multer({
    storage:storage,
    fileFilter:fileFilter
  })

  router.post("/create-form-part-b",verifyToken,upload.fields([{name:'fire_security_regulation',maxCount:1},{name:'file_upload',maxCount:1}]),createFormPartB);
  router.put("/update-form-part-b",verifyToken,upload.fields([{name:'fire_security_regulation',maxCount:1},{name:'file_upload',maxCount:1}]),updateFormPartB);
  router.get("/get-form-part-b/:id",verifyToken,getSingleFormB);
  router.get("/get-form-part-b-data",verifyToken,getFormBData);
  router.delete("/delete-form-part-b/:id",verifyToken,deleteFormB);

  module.exports = router;