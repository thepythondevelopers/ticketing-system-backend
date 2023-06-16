const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const releaseFormPartBSchema = new Schema({
    introduction:{
        type:String,
        //required : true,
        trim : true
    },
    location_id:{
        type:String,
        required : true,
        trim : true
    },
    fire_security_regulation:{
        type:String,
        //required : true,
        trim : true
    },
    fire_protection:{
        type:String,
        //required : true,
        trim : true
    },
    fire_smoke_propegation:{
        type:String,
        //required : true,
        trim : true
    },
    rescue_routes:{
        type:String,
        //required : true,
        trim : true
    },
    sihnalization:{
        type:String,
        trim : true
    },
    behaviour:{
        type:String,
        trim : true
    },
    report_fire:{
        type:String,
        trim : true
    },
    observaion_alarm:{
        type:String,
        trim : true
    },
    bring_to_safety:{
        type: String,
        trim : true
    },
    attemp_extingush:{
        type: String,
        trim : true
    },
    special_rule:{
        type: String,
        trim : true
    },
    appendix:{
        type: String,
        trim : true
    },
    file_upload:{
        type: String,
        trim : true
    },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("ReleaseFormPartB",releaseFormPartBSchema);

