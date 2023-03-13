const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createCategory,getCategoryData,getSingleCategoryData,updateCategory,deleteCategory} = require("../controllers/category");
const {verifyToken} = require("../middleware/auth");


router.post("/create-category",verifyToken,[
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("color").not().isEmpty().withMessage('Must Have value')
],createCategory);
router.post("/get-category",verifyToken,getCategoryData);
router.post("/get-category/:id",verifyToken,getSingleCategoryData);
router.put("/update-category/:id",[
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("color").not().isEmpty().withMessage('Must Have value')
],verifyToken,updateCategory);
router.delete("/delete-category/:id",verifyToken,deleteCategory);
module.exports = router;