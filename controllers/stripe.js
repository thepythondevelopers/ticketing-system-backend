require('dotenv').config();
const {validationResult} = require("express-validator");
const stripe = require('stripe')(process.env.STRIPE_KEY);




exports.stripePayment = async (req,res)=>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  
    stripe.customers.create({
        email: req.user.email,
        source: req.body.token
    })
    .then((customer) => {
  
        return stripe.charges.create({
            amount: 25*100,   
            description: 'Ticketing',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });

  
}    