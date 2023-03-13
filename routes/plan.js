const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createPlan,updatePlan,getSinglePlan,getPlanData,deletePlan} = require("../controllers/plan");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/plan")
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

router.post("/create-plan",verifyToken,upload.fields([{name:'upload_document',maxCount:1}]),createPlan);
router.put("/update-plan/:id",verifyToken,upload.fields([{name:'upload_document',maxCount:1}]),updatePlan);
router.get("/get-plan/:id",verifyToken,getSinglePlan);
router.get("/get-plan-data/:location_id",verifyToken,getPlanData);
router.delete("/delete-plan/:id",verifyToken,deletePlan);
  
module.exports = router;