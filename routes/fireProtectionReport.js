const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createFireProtectionReport,getFireProtectionReport,getFireProtectionReportData,updateFireProtectionReport,deleteFireProtectionReport} = require("../controllers/fireProtectionReport");
const {verifyToken} = require("../middleware/auth");



router.post("/create-fire-protection-report",verifyToken,createFireProtectionReport);
router.get("/get-fire-protection-report/:id",verifyToken,getFireProtectionReport);
router.get("/get-fire-protection-report-data",verifyToken,getFireProtectionReportData);
router.put("/update-fire-protection-report/:id",verifyToken,updateFireProtectionReport);
router.delete("/delete-fire-protection-report/:id",verifyToken,deleteFireProtectionReport);
module.exports = router;

