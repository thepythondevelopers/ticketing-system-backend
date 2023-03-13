const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createTicket,updateTicket,getSingleTicket,getTicketData,deleteTicket} = require("../controllers/ticketing");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/ticketing")
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

  router.post("/create-ticketing",verifyToken,upload.fields([{name:'ticketing',maxCount:1}]),createTicket);
  router.put("/update-ticketing/:id",verifyToken,upload.fields([{name:'ticketing',maxCount:1}]),updateTicket);
  router.get("/get-ticketing/:id",verifyToken,getSingleTicket);
  router.get("/get-ticketing-data",verifyToken,getTicketData);
  router.delete("/delete-ticketing/:id",verifyToken,deleteTicket);
  
module.exports = router;