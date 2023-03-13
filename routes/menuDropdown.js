const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createdropDown,getMenuDropdownData,getMenuDropdownDataId,updateMenuDropdown,deleteMenuDropDown} = require("../controllers/menuDropdown");
const {verifyToken,adminroleCheck} = require("../middleware/auth");

//actual routes
router.post("/create-menu-dropwn",verifyToken,[
    check("event_calender").not().isEmpty().withMessage('Must Have value'),
    check("note").not().isEmpty().withMessage('Must Have value'),
    check("board_fixed").not().isEmpty().withMessage('Must Have value'),
    check("location").not().isEmpty().withMessage('Must Have value')
],createdropDown);
router.post("/get-menu-dropdown/:location_id",verifyToken,getMenuDropdownData);
router.post("/get-menu-dropdown/:id",verifyToken,getMenuDropdownDataId);


router.put("/update-menu-dropdown/:id",verifyToken,[
    check("event_calender").not().isEmpty().withMessage('Must Have value'),
    check("note").not().isEmpty().withMessage('Must Have value'),
    check("board_fixed").not().isEmpty().withMessage('Must Have value')
],updateMenuDropdown);
router.delete("/delete-menu-dropdown/:id",verifyToken,deleteMenuDropDown);


module.exports = router;

