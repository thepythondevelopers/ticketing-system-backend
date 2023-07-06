const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createForm,getCacheReleaseData,createCacheRelease,getSingleForm,getFormData,updateForm,deleteForm,createpdf} = require("../controllers/form");
const {verifyToken} = require("../middleware/auth");

router.post("/create-pdf",createpdf);

router.post("/create-form",verifyToken,createForm);
router.post("/create-cache-release/:id",verifyToken,createCacheRelease);
router.get("/get-form/:id",verifyToken,getSingleForm);
router.get("/get-form-data/:location_id",verifyToken,getFormData);
router.get("/get-cache-release-data/:location_id",verifyToken,getCacheReleaseData);
router.put("/update-form/:id",verifyToken,updateForm);
router.delete("/delete-form/:id",verifyToken,deleteForm);
module.exports = router;

