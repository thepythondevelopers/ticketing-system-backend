const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const evacuationSchema = new Schema({
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
    evacuation_nr: {
        type: String
    },
    date: {
        type: Date
    },
    general: {
        company_name: {
            type: String
        },
        state: {
            type: String
        },
        zip_code: {
            type: String
        },
        employees: {
            type: String
        },
        floors: {
            type: String
        },
        fire_alarm_system: {
            type: String
        },
        evacuation_helper: {
            type: String
        },
        exercise_announced: {
            type: String
        },
        exercise_with_frog:{
            type: String
        }
    },
    procedure: {
        police: {
            type: Boolean
        },
        fire_department:{
            type: Boolean
        },
        fire_alarm_system:{
            type: Boolean
        },
        fire_alarm_system2:{
            type: Boolean
        },
        fire_department_key_depot:{
            type: Boolean
        },
        others:{
            type: Boolean
        },
        others2:{
            type: Boolean
        },
        others_information: {
            type: String
        },
        others2_information: {
            type: String
        },
        assumed_situation:{
            type: String
        },
        no_of_excercise_observation: {
            type: String
        }
    },
    evacuation_time: {
        start_evacuation_drill:{
            type: String
        },
        detection_damage_event:{
            type: String
        },
        iffpw:{
            type:String
        },
        arival:{
            type:String
        },
        end_evacuation:{
            type:String
        },
        assembly_way:{
            type: String
        },
        total_time:{
            type: String
        },
        building_cleared: {
            type: String
        }
    },
    deficiency: [
        {
        title: {
            type: String,
            required : true
        },
        description: {
            type: String,
            required : true
        }
        }
    ]
    
},{timestamps: true});

module.exports = mongoose.model("Evacuation",evacuationSchema);
