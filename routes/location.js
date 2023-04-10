const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createLocation,updateLocation,getSingleLocation,getLocationData,deleteLocation} = require("../controllers/location");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/location")
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

  router.post("/create-location",verifyToken,upload.fields([{name:'location_image',maxCount:1},{name:'company_logo',maxCount:1}]),
  [
    check("company_name").notEmpty(),
    check("house_number").notEmpty(),
    check("street").notEmpty(),
    check("postal_code").notEmpty(),
    check("city").notEmpty(),
    check("show_as").notEmpty(),
    check("location").notEmpty(),
    check("no_of_members").notEmpty(),
    check("percentage").notEmpty()
  ]
  ,createLocation);
  router.put("/update-location/:id",verifyToken,upload.fields([{name:'location_image',maxCount:1},{name:'company_logo',maxCount:1}]),
  [
    check("company_name").notEmpty(),
    check("house_number").notEmpty(),
    check("street").notEmpty(),
    check("postal_code").notEmpty(),
    check("city").notEmpty(),
    check("show_as").notEmpty(),
    check("location").notEmpty(),
    check("no_of_members").notEmpty(),
    check("percentage").notEmpty()
  ],
  updateLocation);
  router.get("/get-location/:id",verifyToken,getSingleLocation);
  router.get("/get-location-data",verifyToken,getLocationData);
  router.delete("/delete-location/:id",verifyToken,deleteLocation);
  
module.exports = router;
