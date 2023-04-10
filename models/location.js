const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const locationSchema = new Schema({
    company_name:{
        type:String,
        required : true,
        trim : true
    },
    house_number:{
        type:String,
        required : true,
        trim : true
    },
    street:{
        type:String,
        required : true,
        trim : true
    },
    postal_code:{
        type:String,
        required : true,
        trim : true
    },
    city:{
        type:String,
        required : true,
        trim : true
    },
    location_image:{
        type:String,
        trim : true
    },
    show_as:{
        type:String,
        trim : true,
        required: true
    },
    location:{
        type:String,
        required : true,
        trim : true
    },
    company_logo:{
        type:String,
        trim : true
    },
    no_of_members:{
        type: Number,
        trim : true,
        required: true
    },
    percentage:{
        type: Number,
        trim : true,
        required: true
    },
    note:{
        type: String,
        trim : true
    },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("Location",locationSchema);

