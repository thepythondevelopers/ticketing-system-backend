
const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {stripePayment} = require("../controllers/stripe");
const {verifyToken} = require("../middleware/auth");


router.post("/stripe-payment",verifyToken,[
    check("token").not().isEmpty().withMessage('Must Have value')
],stripePayment);


module.exports = router;

