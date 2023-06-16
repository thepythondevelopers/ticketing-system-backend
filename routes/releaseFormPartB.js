const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createFormPartB,updateFormPartB,getDataMultiFormB,getDataSingleFormB,getSingleFormB,getFormBData,deleteFormB} = require("../controllers/releaseFormPartB");
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
    if(file.mimetype==='application/pdf' || file.mimetype==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype==='text/plain'){
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
  router.put("/update-form-part-b/:location",verifyToken,upload.fields([{name:'fire_security_regulation',maxCount:1},{name:'file_upload',maxCount:1}]),updateFormPartB);
  router.get("/get-form-part-b/:id",verifyToken,getSingleFormB);
  router.get("/get-form-part-b-multi/:location",verifyToken,getDataMultiFormB);
  router.get("/get-form-part-b-single/:id",verifyToken,getDataSingleFormB);
  router.get("/get-form-part-b-data",verifyToken,getFormBData);
  router.delete("/delete-form-part-b/:id",verifyToken,deleteFormB);

  module.exports = router;