const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createUploadTemplate,updateUploadTemplate,getSingleTemplate,getUploadDataData,deleteUploadData} = require("../controllers/uploadTemplate");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/template")
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

  router.post("/create-upload-template",verifyToken,upload.fields([{name:'template',maxCount:1}]),createUploadTemplate);
  router.put("/update-upload-template/:id",verifyToken,upload.fields([{name:'template',maxCount:1}]),updateUploadTemplate);
  router.get("/get-upload-template/:id",verifyToken,getSingleTemplate);
  router.get("/get-upload-template-data",verifyToken,getUploadDataData);
  router.delete("/delete-upload-template/:id",verifyToken,deleteUploadData);
  
module.exports = router;