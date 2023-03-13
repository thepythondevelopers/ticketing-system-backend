const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createDrag,getDragData,updateDrag,deleteDrag,deleteAllDrag} = require("../controllers/drag");
const {verifyToken,checkDragExist} = require("../middleware/auth");


//actual routes
router.post("/create-drag",verifyToken,checkDragExist,[
    check("data").not().isEmpty().withMessage('Must Have value'),
    check("location").not().isEmpty().withMessage('Must Have value')
],createDrag);
router.post("/get-drag/:location_id",verifyToken,getDragData);
router.put("/update-drag/:id",[
    check("data").not().isEmpty().withMessage('Must Have value'),
],verifyToken,updateDrag);
//router.delete("/delete-drag/:id",verifyToken,deleteDrag);
router.post("/delete-all-drag",verifyToken,deleteAllDrag);
module.exports = router;