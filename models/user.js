const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{
        type:String,
        required : true,
        trim : true,
    },
    last_name:{
        type:String,
        required : true,
        trim : true,
    },
    email:{
        type:String,
        required : true,
        trim : true,
        unique: true
    },
    password:{
        type:String,
        required : true,
        trim : true
    },
    role:{
        type:String,
        required : true,
        default : 'user'
    },
    company_name:{
        type:String,
        required : true,
        trim : true
    },
    phone_number:{
        type:Number,
        required : true,
        trim : true
    },
    street:{
        type:String,
        required : true,
        trim : true
    },
    house_number:{
        type:String,
        required : true,
        trim : true
    },
    password_reset_token:{
        type:String,
        trim : true
    },
    password_reset_time:{
        type:Date,
        trim : true
    },
    postal_code:{
        type:String,
        trim : true,
        required : true
    },
    city:{
        type:String,
        trim : true,
        required : true
    },
    land:{
        type:String,
        trim : true,
        required : true
    },
    sales_tax_id:{
        type:String,
        trim : true,
        required : true
    },
    about:{
        type:String
    },
    avatar:{
        type:String,
        trim : true
    },
    company_logo:{
        type:String,
        trim : true
    },
    status:{
        type:Boolean,
        default:1 //0=>False 1=>True/Active
    },
},{timestamps: true});

module.exports = mongoose.model("User",userSchema);
