const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const categorySchema = new Schema({
    title:{
        type:String,
        required : true,
        trim : true
    },
    color:{
        type:String,
        required : true,
        trim : true
    },
    // location :{
    //     type : ObjectId,
    //     ref: "Location",
    //     required : true
    // },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("Category",categorySchema);
