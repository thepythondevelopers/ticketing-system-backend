const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createOfficer,getOfficer,getOfficerById} = require("../controllers/officer");
const {verifyToken} = require("../middleware/auth");


//actual routes
router.post("/create-officer",verifyToken,createOfficer);
router.post("/get-officer",verifyToken,getOfficer);
router.post("/get-officer/:id",verifyToken,getOfficerById);

module.exports = router;