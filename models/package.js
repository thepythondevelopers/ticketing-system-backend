const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    title:{
        type:String,
        required : true,
        trim : true
    },
    price :{
        type : Number,
        required : true,
        trim : true
    },
    package_include:{
        type:String,
        required : true,
        trim : true
    },
    note:{
        type:String,
        required : true,
        trim : true
    },
},{timestamps: true});

module.exports = mongoose.model("Package",packageSchema);

