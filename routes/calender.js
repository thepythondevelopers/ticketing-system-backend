const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createCalender,getCalenderData,updateCalender,deleteCalender} = require("../controllers/calender");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/calender")
    },
    filename : function(req,file,cb){
      cb(null,Date.now()+file.originalname)
    }
  })
  
  const fileFilter = (req,file,cb)=>{
    
      cb(null,true)
    
  }
  var upload = multer({
    storage:storage,
    fileFilter:fileFilter
  })

//actual routes
router.post("/create-calender",verifyToken,upload.fields([{name:'file_upload',maxCount:1}]),createCalender);
router.post("/get-calender/:location_id",verifyToken,getCalenderData);
router.put("/update-calender/:id",verifyToken,upload.fields([{name:'file_upload',maxCount:1}]),updateCalender);
router.delete("/delete-calender/:id",verifyToken,deleteCalender);

module.exports = router;

