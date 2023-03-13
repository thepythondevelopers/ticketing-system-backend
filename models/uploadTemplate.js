const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const uploadTemplateSchema = new Schema({
    

    
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    template :{
        type : String,
        required : true
    }
    
},{timestamps: true});

module.exports = mongoose.model("UploadTemplate",uploadTemplateSchema);
