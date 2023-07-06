const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const cacheFormSchema = new Schema({
    user :{
        type : ObjectId,
        ref: "User",
        //required : true
    },
    location:{
        type : ObjectId,
        ref: "Location",
        //required : true
    },
    sequence_no : {
        type: String,
        //required : true
    },
    job : {
        welding_cutting_process: {
            type:Boolean,
            //required : true
        },
        cutting_loop :  {
            type:Boolean,
            //required : true
        },
        soldering :  {
            type:Boolean,
            //required : true
        },
        defrost :  {
            type:Boolean,
            //required : true
        },
        hot_gluing :  {
            type:Boolean,
            //required : true
        },
        job_check_other:  {
            type:Boolean,
            //required : true
        },
        other_text:{
            type:String,
        }
    },
    places_of_work : {
        work_location_position :    {
            type:String,
            //required : true
        },
        perimeter:   {
            type:String,
            //required : true
        },
        height:   {
            type:String,
            //required : true
        },
        depth:   {
            type:String,
            //required : true
        }
    },
    work_order: {
        working_methods:   {
            type:String,
            //required : true
        },
        to_be_caried_out:  {
            type:String,
            //required : true
        }
    },
    file_hazard: {
        removal_of_moveable_material:   {
            type:Boolean,
            //required : true
        },
        removal_of_wall_celling: {
            type:Boolean,
            //required : true
        },
        coverage_stationary_material: {
            type:Boolean,
            //required : true
        },
        sealing_of_openings: {
            type:Boolean,
            //required : true
        },
        file_hazard_other: {
            type:Boolean,
            //required : true
        },
        name: {
            type:String,
            //required : true
        },
        executed: {
            type:String,
            //required : true
        },
        signature: {
            type:String,
            //required : true
        }, 
        fire_extinguisher: {
            type:Boolean,
            //required : true
        }, 
        water: {
            type:Boolean,
            //required : true
        }, 
        powder: {
            type:Boolean,
            //required : true
        }, 
        co2: {
            type:Boolean,
            //required : true
        }, 
        other_agent: {
            type:Boolean,
            //required : true
        },  
        other_agent_name: {
            type:String,
            //required : true
        }, 
        fire_blanket: {
            type:Boolean,
            //required : true
        }, 
        connected_water_hose: {
            type:Boolean,
            //required : true
        }, 
        bucket_filled_water: {
            type:Boolean,
            //required : true
        }, 
        notification_fire_department: {
            type:Boolean,
            //required : true
        }, 
        other_extingushing_agent: {
            type:Boolean,
            //required : true
        }, 
        other_extingushing_agent_name: {
            type:String,
            //required : true
        }, 
        firepost_name: {
            type:String,
            //required : true
        },
        during_file_hazardas_work_name: {
            type:Boolean,
            //required : true
        },
        fire_guard_name: {
            type:String,
            //required : true
        },
        after_completion_of_fire_hazardus: {
            type:Boolean,
            //required : true
        },
        duration: {
            type:String,
            //required : true
        },
        hours: {
            type:String,
            //required : true
        },
        other_text:{
            type:String
        }
    },
    explosion_hazard: {
        removal_of_explosive_substance: {
            type:Boolean,
            //required : true
        },
        explosive_hazard_in_pipelines: {
            type:Boolean,
            //required : true
        },
        sealing_of_stationary_containers: {
            type:Boolean,
            //required : true
        },
        ventilation_measures: {
            type:Boolean,
            //required : true
        },
        setting_up_gas_detector: {
            type:Boolean,
            //required : true
        },
        setting_up_gas_detector_text: {
            type:String,
            //required : true
        },
        explosion_hazard_other: {
            type:Boolean,
            //required : true
        },
        other_text: {
            type:String,
            //required : true
        },
        name: {
            type:String,
            //required : true
        },
        executed: {
            type:String,
            //required : true
        },
        signature: {
            type:String,
            //required : true
        },
        monitoring: {
            type:Boolean,
            //required : true
        },
        monitoring_name: {
            type:String,
            //required : true
        },
        after_complete_fire_hazard: {
            type:Boolean,
            //required : true
        },
        after_complete_fire_hazard_hours: {
            type:String,
            //required : true
        },
        after_complete_fire_hazard_name: {
            type:String,
            //required : true
        },
    },
    alerting: {
        fire_alarm: {
            type:String,
            //required : true
        },
        phone: {
            type:String,
            //required : true
        },
        fire_department_call_no: {
            type:String,
            //required : true
        },
    },
    client: {
        date: {
            type:String,
            //required : true
        },
        signature_of_plant_manager: {
            type:String,
            //required : true
        }
    },
    contractor: {
        date: {
            type:String,
            //required : true
        },
        signature_of_contractor: {
            type:String,
            //required : true
        },
        signature: {
            type:String,
            //required : true
        }
    }
    
},{timestamps: true});

module.exports = mongoose.model("CacheRelease",cacheFormSchema);
