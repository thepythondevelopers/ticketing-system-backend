const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const documentManagementSchema = new Schema({
    file_name:{
        type:String,
        required : true,
        trim : true
    },
    category:{
        type : ObjectId,
        ref: "Category",
        //required : true
    },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    location:{
        type : ObjectId,
        ref: "Location",
        required : true
    },
    date :{
        type : Date,
        required : true,
        trim : true
    },
    upload_document:{
        type:String,
        required : true,
        trim : true
    },
    document_original_name:{
        type:String,
        required : true,
        trim : true
    },
    calendar_reminder_interval:{
        type:String,
        trim : true
    },
    calendar_reminder_choose_date:{
        type:Date,
        trim : true
    },
    note_item:{
        type:String,
        trim : true
    },
    note_create_task:{
        type:String,
        trim : true
    },
},{timestamps: true});

module.exports = mongoose.model("DocumentManagement",documentManagementSchema);