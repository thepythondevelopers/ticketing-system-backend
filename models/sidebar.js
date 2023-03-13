const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const sidebarSchema = new Schema({
    title:{
        type:String,
        required : true,
        trim : true
    },
    location :{
        type : ObjectId,
        ref: "Location",
        required : true
    },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    file_upload:{
        type:String,
        trim : true
    },
    checked:{
        type:Boolean,
        default:0 //0=>False 1=>True
    },
    completedate:{
        type:Date
    },
},{timestamps: true});

module.exports = mongoose.model("Sidebar",sidebarSchema);
