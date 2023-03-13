const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createSidebar,getSidebarData,getCheckedSidebarData,updateSidebar,deleteSidebar,checkedSidebar,uncheckedSidebar} = require("../controllers/sidebar");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/sidebar")
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
router.post("/create-sidebar",verifyToken,upload.fields([{name:'file_upload',maxCount:1}]),createSidebar);
router.post("/get-sidebar/:location_id",verifyToken,getSidebarData);
router.post("/get-checked-sidebar/:location_id",verifyToken,getCheckedSidebarData);

router.put("/update-sidebar/:id",verifyToken,upload.fields([{name:'file_upload',maxCount:1}]),updateSidebar);
router.delete("/delete-sidebar/:id",verifyToken,deleteSidebar);

router.put("/checked-sidebar/:id",verifyToken,checkedSidebar);
router.put("/unchecked-sidebar/:id",verifyToken,uncheckedSidebar);
module.exports = router;

