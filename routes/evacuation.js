const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createEvacuation,totalEvacuation,getSingleEvacuation,updateEvacuation,getEvacuationData,deleteEvacuation} = require("../controllers/evacuation");
const {verifyToken} = require("../middleware/auth");



router.post("/create-evacuation",verifyToken,createEvacuation);
router.get("/get-evacuation/:id",verifyToken,getSingleEvacuation);
router.get("/total-evacuation/:email",verifyToken,totalEvacuation);
router.get("/get-evacuation-data/:location_id",verifyToken,getEvacuationData);
router.put("/update-evacuation/:id",verifyToken,updateEvacuation);
router.delete("/delete-evacuation/:id",verifyToken,deleteEvacuation);
module.exports = router;

