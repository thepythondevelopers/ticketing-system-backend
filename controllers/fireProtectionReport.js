const FireProtectionReport = require("../models/fireProtectionReport");
const {validationResult} = require("express-validator");

exports.createFireProtectionReport = (req,res) =>{
    
  

    data={
            user : req.user._id,
            businessYear : req.body.businessYear,
            basicData: {
        fire_protection_concept: req.body.basicData.fire_protection_concept,
        from_date: req.body.basicData.from_date,
        description: req.body.basicData.description
    },
    personen_mit: {
        managing_director: req.body.personen_mit.managing_director,
        managing_director_text: req.body.personen_mit.managing_director_text,
        deputy_managing_director: req.body.personen_mit.deputy_managing_director,
        deputy_managing_director_text: req.body.personen_mit.deputy_managing_director_text,
        object_manager: req.body.personen_mit.object_manager,
        object_manager_text: req.body.personen_mit.object_manager_text,
        responsible_fire_protection: req.body.personen_mit.responsible_fire_protection,
        responsible_fire_protection_text: req.body.personen_mit.responsible_fire_protection_text,
        fire_protection_officer: req.body.personen_mit.fire_protection_officer,
        last_training: req.body.personen_mit.last_training,
        hours_spent: req.body.personen_mit.hours_spent,
        safety_helper_soll: req.body.personen_mit.safety_helper_soll,
        safety_helper_lst: req.body.personen_mit.safety_helper_lst,

    },
    plant_fire_protection: {
        bma: req.body.plant_fire_protection.bma,
        kat1: req.body.plant_fire_protection.kat1,
        kat2: req.body.plant_fire_protection.kat2,
        kat3: req.body.plant_fire_protection.kat3,
        kat4: req.body.plant_fire_protection.kat4,
        house_alarm_system: req.body.plant_fire_protection.house_alarm_system,
        detector_groups: req.body.plant_fire_protection.detector_groups,
        detector: req.body.plant_fire_protection.detector,
        push_button_detector: req.body.plant_fire_protection.push_button_detector,
        last_training: req.body.plant_fire_protection.last_training,
        last_inspection:req.body.plant_fire_protection.last_inspection,
        extinguishing_system: req.body.plant_fire_protection.extinguishing_system,
        sprinkler: req.body.plant_fire_protection.sprinkler,
        wet: req.body.plant_fire_protection.wet,
        dry: req.body.plant_fire_protection.dry,
        tandem: req.body.plant_fire_protection.tandem,
        pilot_operated: req.body.plant_fire_protection.pilot_operated,
        gas_extinguishing_system: req.body.plant_fire_protection.gas_extinguishing_system,
        other_extinguishing_system: req.body.plant_fire_protection.other_extinguishing_system,
        types_of: req.body.plant_fire_protection.types_of,
        gas: req.body.plant_fire_protection.gas,
        gas_last_inspection: req.body.plant_fire_protection.gas_last_inspection,
        rwa: req.body.plant_fire_protection.rwa,
        natural: req.body.plant_fire_protection.natural,
        machine: req.body.plant_fire_protection.machine,
        wall_hydrants: req.body.plant_fire_protection.wall_hydrants,
        typS: req.body.plant_fire_protection.typS,
        typf: req.body.plant_fire_protection.typf,
        riser_dry: req.body.plant_fire_protection.riser_dry,
        safety_lighting: req.body.plant_fire_protection.safety_lighting,
        alarm_system: req.body.plant_fire_protection.alarm_system,
        type_last_inspection: req.body.plant_fire_protection.type_last_inspection,

    },
    structural_fire_protection: {
        smoke_protection_gates: req.body.structural_fire_protection.smoke_protection_gates,
        smoke_protection_gates_inspection: req.body.structural_fire_protection.smoke_protection_gates_inspection,
        noise_protection_doors: req.body.structural_fire_protection.noise_protection_doors,
        noise_protection_doors_inspection: req.body.structural_fire_protection.noise_protection_doors_inspection,
        fire_doors: req.body.structural_fire_protection.fire_doors,
        fire_doors_inspection: req.body.structural_fire_protection.fire_doors_inspection,
        fire_dampers: req.body.structural_fire_protection.fire_dampers,
        fire_dampers_inspection: req.body.structural_fire_protection.fire_dampers_inspection,
        thermal: req.body.structural_fire_protection.thermal,
        machine: req.body.structural_fire_protection.machine,
        hold_open_systems: req.body.structural_fire_protection.hold_open_systems,
        hold_open_systems_inspection: req.body.structural_fire_protection.hold_open_systems_inspection,
    },
    organizational_fire_protection: {
        fire_protection_regulations_partA: req.body.organizational_fire_protection.fire_protection_regulations_partA,
        fire_protection_regulations_partA_inspection: req.body.organizational_fire_protection.fire_protection_regulations_partA_inspection,
        fire_protection_regulations_partB: req.body.organizational_fire_protection.fire_protection_regulations_partB,
        fire_protection_regulations_partB_inspection: req.body.organizational_fire_protection.fire_protection_regulations_partB_inspection,
        fire_protection_regulations_partC: req.body.organizational_fire_protection.fire_protection_regulations_partC,
        fire_protection_regulations_partC_inspection: req.body.organizational_fire_protection.fire_protection_regulations_partC_inspection,
        escape_rescue_plans: req.body.organizational_fire_protection.escape_rescue_plans,
        escape_rescue_plans_inspection:req.body.organizational_fire_protection.escape_rescue_plans_inspection,
        fire_protection_plans: req.body.organizational_fire_protection.fire_protection_plans,
        fire_protection_plans_inspection: req.body.organizational_fire_protection.fire_protection_plans_inspection,
        fire_safety_inspection: req.body.organizational_fire_protection.fire_safety_inspection,
        authority_inspection: req.body.organizational_fire_protection.authority_inspection,
    },
    events: {
        total_fire_alarms : req.body.events.total_fire_alarms,
        thereof_via_BMA: req.body.events.thereof_via_BMA,
        thereof_via_emergency_call : req.body.events.thereof_via_emergency_call,
        of_these_were: req.body.events.of_these_were,
        fires: req.body.events.fires,
        false_alarms: req.body.events.false_alarms,
        fire_Hazardous_Work: req.body.events.fire_Hazardous_Work,
        evacuation_exercises: req.body.events.evacuation_exercises,
    }

        
    }   
  
     
    
    protectionReport =new FireProtectionReport(data);
    protectionReport.save((err,document)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json(document);
    })
}



exports.getFireProtectionReport =  (req,res)=>{
    let id = req.params.id;
    FireProtectionReport.findOne({_id:id,user:req.user._id}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(document);
    })    
}

exports.updateFireProtectionReport = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data={
    businessYear : req.body.businessYear,
    basicData: {
        fire_protection_concept: req.body.basicData.fire_protection_concept,
        from_date: req.body.basicData.from_date,
        description: req.body.basicData.description
        },
    personen_mit: {
        managing_director: req.body.personen_mit.managing_director,
        managing_director_text: req.body.personen_mit.managing_director_text,
        deputy_managing_director: req.body.personen_mit.deputy_managing_director,
        deputy_managing_director_text: req.body.personen_mit.deputy_managing_director_text,
        object_manager: req.body.personen_mit.object_manager,
        object_manager_text: req.body.personen_mit.object_manager_text,
        responsible_fire_protection: req.body.personen_mit.responsible_fire_protection,
        responsible_fire_protection_text: req.body.personen_mit.responsible_fire_protection_text,
        fire_protection_officer: req.body.personen_mit.fire_protection_officer,
        last_training: req.body.personen_mit.last_training,
        hours_spent: req.body.personen_mit.hours_spent,
        safety_helper_soll: req.body.personen_mit.safety_helper_soll,
        safety_helper_lst: req.body.personen_mit.safety_helper_lst
    },
    plant_fire_protection: {
        bma: req.body.plant_fire_protection.bma,
        kat1: req.body.plant_fire_protection.kat1,
        kat2: req.body.plant_fire_protection.kat2,
        kat3: req.body.plant_fire_protection.kat3,
        kat4: req.body.plant_fire_protection.kat4,
        house_alarm_system: req.body.plant_fire_protection.house_alarm_system,
        detector_groups: req.body.plant_fire_protection.detector_groups,
        detector: req.body.plant_fire_protection.detector,
        push_button_detector: req.body.plant_fire_protection.push_button_detector,
        last_training: req.body.plant_fire_protection.last_training,
        last_inspection:req.body.plant_fire_protection.last_inspection,
        extinguishing_system: req.body.plant_fire_protection.extinguishing_system,
        sprinkler: req.body.plant_fire_protection.sprinkler,
        wet: req.body.plant_fire_protection.wet,
        dry: req.body.plant_fire_protection.dry,
        tandem: req.body.plant_fire_protection.tandem,
        pilot_operated: req.body.plant_fire_protection.pilot_operated,
        gas_extinguishing_system: req.body.plant_fire_protection.gas_extinguishing_system,
        other_extinguishing_system: req.body.plant_fire_protection.other_extinguishing_system,
        types_of: req.body.plant_fire_protection.types_of,
        gas: req.body.plant_fire_protection.gas,
        gas_last_inspection: req.body.plant_fire_protection.gas_last_inspection,
        rwa: req.body.plant_fire_protection.rwa,
        natural: req.body.plant_fire_protection.natural,
        machine: req.body.plant_fire_protection.machine,
        wall_hydrants: req.body.plant_fire_protection.wall_hydrants,
        typS: req.body.plant_fire_protection.typS,
        typf: req.body.plant_fire_protection.typf,
        riser_dry: req.body.plant_fire_protection.riser_dry,
        safety_lighting: req.body.plant_fire_protection.safety_lighting,
        alarm_system: req.body.plant_fire_protection.alarm_system,
        type_last_inspection: req.body.plant_fire_protection.type_last_inspection,
    },
    structural_fire_protection: {
        smoke_protection_gates: req.body.structural_fire_protection.smoke_protection_gates,
        smoke_protection_gates_inspection: req.body.structural_fire_protection.smoke_protection_gates_inspection,
        noise_protection_doors: req.body.structural_fire_protection.noise_protection_doors,
        noise_protection_doors_inspection: req.body.structural_fire_protection.noise_protection_doors_inspection,
        fire_doors: req.body.structural_fire_protection.fire_doors,
        fire_doors_inspection: req.body.structural_fire_protection.fire_doors_inspection,
        fire_dampers: req.body.structural_fire_protection.fire_dampers,
        fire_dampers_inspection: req.body.structural_fire_protection.fire_dampers_inspection,
        thermal: req.body.structural_fire_protection.thermal,
        machine: req.body.structural_fire_protection.machine,
        hold_open_systems: req.body.structural_fire_protection.hold_open_systems,
        hold_open_systems_inspection: req.body.structural_fire_protection.hold_open_systems_inspection,
    },
    organizational_fire_protection: {
        fire_protection_regulations_partA: req.body.organizational_fire_protection.fire_protection_regulations_partA,
        fire_protection_regulations_partA_inspection: req.body.organizational_fire_protection.fire_protection_regulations_partA_inspection,
        fire_protection_regulations_partB: req.body.organizational_fire_protection.fire_protection_regulations_partB,
        fire_protection_regulations_partB_inspection: req.body.organizational_fire_protection.fire_protection_regulations_partB_inspection,
        fire_protection_regulations_partC: req.body.organizational_fire_protection.fire_protection_regulations_partC,
        fire_protection_regulations_partC_inspection: req.body.organizational_fire_protection.fire_protection_regulations_partC_inspection,
        escape_rescue_plans: req.body.organizational_fire_protection.escape_rescue_plans,
        escape_rescue_plans_inspection:req.body.organizational_fire_protection.escape_rescue_plans_inspection,
        fire_protection_plans: req.body.organizational_fire_protection.fire_protection_plans,
        fire_protection_plans_inspection: req.body.organizational_fire_protection.fire_protection_plans_inspection,
        fire_safety_inspection: req.body.organizational_fire_protection.fire_safety_inspection,
        authority_inspection: req.body.organizational_fire_protection.authority_inspection,
    },
    events: {
        total_fire_alarms : req.body.events.total_fire_alarms,
        thereof_via_BMA: req.body.events.thereof_via_BMA,
        thereof_via_emergency_call : req.body.events.thereof_via_emergency_call,
        of_these_were: req.body.events.of_these_were,
        fires: req.body.events.fires,
        false_alarms: req.body.events.false_alarms,
        fire_Hazardous_Work: req.body.events.fire_Hazardous_Work,
        evacuation_exercises: req.body.events.evacuation_exercises,
    }


}     
  FireProtectionReport.updateOne(
    {_id : id},
    {$set : data},
    {new: true},
    (err,form) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(form===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(form);
    }
    )   
}

exports.getFireProtectionReportData = (req,res)=>{
    
    FireProtectionReport.find({user:req.user._id}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(document);
    })    
}

exports.deleteFireProtectionReport = (req,res) =>{
    let id = req.params.id;
    FireProtectionReport.deleteOne(
        {_id : id,user:req.user._id},
        (err,document) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(document.deletedCount==1){
                return res.json({id : id});
            }
            if(document.deletedCount==0){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
            return res.status(404).json({
                message : "Something Went Wrong"
            })
        }
        )
  }

