const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {getUser,updateUser,getUserListing,getUserAdmin,updateUserAdmin,userActive,userDeactivate,deleteUser} = require("../controllers/user");
const {verifyToken,adminroleCheck} = require("../middleware/auth");
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

//actual routes
router.post("/get-profile",verifyToken,getUser);
router.put("/update-profile",verifyToken,upload.fields([{name:'avatar',maxCount:1},{name:'company_logo',maxCount:1}]),updateUser);
// router.put("/update-profile",verifyToken,[
//     check("first_name").not().isEmpty().withMessage('Must Have value'),
//     check("last_name").not().isEmpty().withMessage('Must Have value'),
//     check("company_name").not().isEmpty().withMessage('Must Have value'),
//     check("phone_number").not().isEmpty().withMessage('Must Have value'),
//     check("street").not().isEmpty().withMessage('Must Have value'),
//     check("house_number").not().isEmpty().withMessage('Must Have value'),
//     //check("about").not().isEmpty().withMessage('Must Have value'),
//     check("postal_code").not().isEmpty().withMessage('Must Have value'),
//     check("city").not().isEmpty().withMessage('Must Have value'),
//     check("land").not().isEmpty().withMessage('Must Have value'),
//     check("sales_tax_id").not().isEmpty().withMessage('Must Have value')
// ],updateUser);


router.post("/get-user-listing",verifyToken,adminroleCheck,getUserListing);
router.post("/get-user-detail/:id",verifyToken,adminroleCheck,getUserAdmin);
router.put("/update-user-admin/:id",verifyToken,upload.fields([{name:'avatar',maxCount:1},{name:'company_logo',maxCount:1}]),updateUserAdmin);
// router.put("/update-user-admin/:id",verifyToken,[
//     check("first_name").not().isEmpty().withMessage('Must Have value'),
//     check("last_name").not().isEmpty().withMessage('Must Have value'),
//     check("company_name").not().isEmpty().withMessage('Must Have value'),
//     check("phone_number").not().isEmpty().withMessage('Must Have value'),
//     check("street").not().isEmpty().withMessage('Must Have value'),
//     check("house_number").not().isEmpty().withMessage('Must Have value'),
//     //check("about").not().isEmpty().withMessage('Must Have value'),
//     check("postal_code").not().isEmpty().withMessage('Must Have value'),
//     check("city").not().isEmpty().withMessage('Must Have value'),
//     check("land").not().isEmpty().withMessage('Must Have value'),
//     check("sales_tax_id").not().isEmpty().withMessage('Must Have value')
    
// ],updateUserAdmin);

router.post("/user-active/:id",verifyToken,adminroleCheck,userActive);
router.post("/user-deactive/:id",verifyToken,adminroleCheck,userDeactivate);

router.delete("/user-delete/:id",verifyToken,adminroleCheck,deleteUser);
module.exports = router;

