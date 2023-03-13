const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const fireProtectionReportSchema = new Schema({
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    businessYear : {
        type: String
    },
    basicData: {
        fire_protection_concept: {
            type: Boolean
        },
        from_date: {
            type: String
        },
        description: {
            type: String
        }
    },
    personen_mit: {
        managing_director: {
            type: Boolean
        },
        managing_director_text: {
            type: String
        },
        deputy_managing_director: {
            type: Boolean
        },
        deputy_managing_director_text: {
            type: String
        },
        object_manager: {
            type: String
        },
        object_manager_text: {
            type: String
        },
        responsible_fire_protection: {
            type: Boolean
        },
        responsible_fire_protection_text: {
            type: String
        },
        fire_protection_officer: {
            type: Boolean
        },
        last_training: {
            type: String
        },
        hours_spent: {
            type: String
        },
        safety_helper_soll: {
            type: String
        },
        safety_helper_lst: {
            type: String
        },

    },
    plant_fire_protection: {
        bma: {
            type: Boolean
        },
        kat1: {
            type: Boolean
        },
        kat2: {
            type: Boolean
        },
        kat3: {
            type: Boolean
        },
        kat4: {
            type: Boolean
        },
        house_alarm_system: {
            type: Boolean
        },
        detector_groups: {
            type: String
        },
        detector: {
            type: String
        },
        push_button_detector: {
            type: String
        },
        last_training: {
            type: String
        },
        last_inspection: {
            type: String
        },
        extinguishing_system: {
            type: Boolean
        },
        sprinkler: {
            type: Boolean
        },
        wet: {
            type: Boolean
        },
        dry: {
            type: Boolean
        },
        tandem: {
            type: Boolean
        },
        pilot_operated: {
            type: Boolean
        },
        gas_extinguishing_system: {
            type: Boolean
        },
        other_extinguishing_system: {
            type: Boolean
        },
        types_of: {
            type: String
        },
        gas: {
            type: String
        },
        gas_last_inspection: {
            type: String
        },
        rwa: {
            type: Boolean
        },
        natural: {
            type: Boolean
        },
        machine: {
            type: Boolean
        },
        wall_hydrants: {
            type: Boolean
        },
        typS: {
            type: Boolean
        },
        typf: {
            type: Boolean
        },
        riser_dry: {
            type: Boolean
        },
        safety_lighting: {
            type: Boolean
        },
        alarm_system: {
            type: Boolean
        },
        type_last_inspection: {
            type: Boolean
        },

    },
    structural_fire_protection: {
        smoke_protection_gates: {
            type: Boolean
        },
        smoke_protection_gates_inspection: {
            type: String
        },
        noise_protection_doors: {
            type: Boolean
        },
        noise_protection_doors_inspection: {
            type: String
        },
        fire_doors: {
            type: Boolean
        },
        fire_doors_inspection: {
            type: String
        },
        fire_dampers: {
            type: Boolean
        },
        fire_dampers_inspection: {
            type: String
        },
        thermal: {
            type: Boolean
        },
        machine: {
            type: Boolean
        },
        hold_open_systems: {
            type: Boolean
        },
        hold_open_systems_inspection: {
            type: String
        },
    },
    organizational_fire_protection: {
        fire_protection_regulations_partA: {
            type: Boolean
        },
        fire_protection_regulations_partA_inspection: {
            type: String
        },
        fire_protection_regulations_partB: {
            type: Boolean
        },
        fire_protection_regulations_partB_inspection: {
            type: String
        },
        fire_protection_regulations_partC: {
            type: Boolean
        },
        fire_protection_regulations_partC_inspection: {
            type: String
        },
        escape_rescue_plans: {
            type: Boolean
        },
        escape_rescue_plans_inspection: {
            type: String
        },
        fire_protection_plans: {
            type: Boolean
        },
        fire_protection_plans_inspection: {
            type: String
        },
        fire_safety_inspection: {
            type: String
        },
        authority_inspection: {
            type: String
        },
    },
    events: {
        total_fire_alarms : {
            type: String
        },
        thereof_via_BMA: {
            type: String
        },
        thereof_via_emergency_call : {
            type: String
        },
        of_these_were: {
            type: String
        },
        fires: {
            type: String
        },
        false_alarms: {
            type: String
        },
        fire_Hazardous_Work: {
            type: String
        },
        evacuation_exercises: {
            type: String
        },
    }
},{timestamps: true});

module.exports = mongoose.model("fireProtectionReport",fireProtectionReportSchema);
