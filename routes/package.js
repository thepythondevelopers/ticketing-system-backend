const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createPackage,getPackage,getPackageById,updatePackage,deletePackage} = require("../controllers/package");
const {verifyToken,adminroleCheck} = require("../middleware/auth");

router.post("/create-package",verifyToken,adminroleCheck,[
        check("title").not().isEmpty().withMessage('Must Have value'),
        check("price").not().isEmpty().withMessage('Must Have value').isInt().withMessage('Must Have Integer value'),
        check("package_include").not().isEmpty().withMessage('Must Have value'),
        check("note").not().isEmpty().withMessage('Must Have value')
],createPackage);
router.post("/get-package",getPackage);
router.post("/get-package/:id",getPackageById);

router.put("/update-package/:id",verifyToken,adminroleCheck,[
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("price").not().isEmpty().withMessage('Must Have value').isInt().withMessage('Must Have Integer value'),
    check("package_include").not().isEmpty().withMessage('Must Have value'),
    check("note").not().isEmpty().withMessage('Must Have value')
],updatePackage);
//router.delete("/delete-package/:id",verifyToken,deletePackage);

module.exports = router;

