const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createDocument,updateDocument,getSingleDocument,getDocumentData,deleteDocument} = require("../controllers/documentManagement");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/documents")
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

router.post("/create-document",verifyToken,upload.fields([{name:'upload_document',maxCount:1}]),createDocument);
router.put("/update-document/:id",verifyToken,upload.fields([{name:'upload_document',maxCount:1}]),updateDocument);
router.get("/get-document/:id",verifyToken,getSingleDocument);
router.get("/get-document-data/:location_id",verifyToken,getDocumentData);
router.delete("/delete-document/:id",verifyToken,deleteDocument);
  
module.exports = router;