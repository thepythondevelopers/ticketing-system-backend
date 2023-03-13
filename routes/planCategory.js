const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createCategory,getCategoryData,getSingleCategoryData,updateCategory,deleteCategory} = require("../controllers/planCategory");
const {verifyToken} = require("../middleware/auth");


router.post("/create-plan-category",verifyToken,[
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("color").not().isEmpty().withMessage('Must Have value')
],createCategory);
router.post("/get-plan-category",verifyToken,getCategoryData);
router.post("/get-plan-category/:id",verifyToken,getSingleCategoryData);
router.put("/update-plan-category/:id",[
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("color").not().isEmpty().withMessage('Must Have value')
],verifyToken,updateCategory);
router.delete("/delete-plan-category/:id",verifyToken,deleteCategory);
module.exports = router;