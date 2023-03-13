const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const ticketingSchema = new Schema({
    

    
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    ticketing :{
        type : String,
        required : true
    }
    
},{timestamps: true});

module.exports = mongoose.model("TicketingSchema",ticketingSchema);
