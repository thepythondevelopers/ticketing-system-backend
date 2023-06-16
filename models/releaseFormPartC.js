const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const releaseFormPartCSchema = new Schema({
    introduction:{
        type:String,
        trim : true
    },
    fire_protection:{
        type:String,
        trim : true
    },
    alert_procedure:{
        type:String,
        trim : true
    },
    safety_measures:{
        type:String,
        trim : true
    },
    extingush_measure:{
        type:String,
        trim : true
    },
    fire_department:{
        type:String,
        trim : true
    },
    aftercare:{
        type:String,
        trim : true
    },
    site_specific:{
        type:String,
        trim : true
    },
    appendix:{
        type:String,
        trim : true
    },
    file_upload:{
        type: String
    },
    location_id:{
        type:String,
        required : true,
        trim : true
    },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("ReleaseFormPartC",releaseFormPartCSchema);

