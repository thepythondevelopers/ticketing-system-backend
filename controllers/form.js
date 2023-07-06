const Form = require("../models/form");
const CacheRelease = require("../models/cache_release")
const {validationResult} = require("express-validator");
var html_to_pdf = require('html-pdf-node');
var pdf = require('html-pdf');


exports.createCacheRelease = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  

    data={
            user : req.user._id,
            location: req.body.location,
            sequence_no : req.body.sequence_no,
            job : {
                welding_cutting_process: req.body.job.welding_cutting_process,
                cutting_loop :  req.body.job.cutting_loop,
                soldering : req.body.job.soldering,
                defrost : req.body.job.defrost,
                hot_gluing : req.body.job.hot_gluing,
                job_check_other:  req.body.job.job_check_other,
                other_text:req.body.job.other_text
            },
            places_of_work : {
                work_location_position : req.body.places_of_work.work_location_position,
                perimeter: req.body.places_of_work.perimeter,
                height: req.body.places_of_work.height,
                depth: req.body.places_of_work.depth   
            },
            work_order: {
                working_methods: req.body.work_order.working_methods,
                to_be_caried_out: req.body.work_order.to_be_caried_out 
            },
            file_hazard: {
                removal_of_moveable_material: req.body.file_hazard.removal_of_moveable_material,
                removal_of_wall_celling: req.body.file_hazard.removal_of_wall_celling,
                coverage_stationary_material: req.body.file_hazard.coverage_stationary_material,
                sealing_of_openings: req.body.file_hazard.sealing_of_openings,
                file_hazard_other: req.body.file_hazard.file_hazard_other,
                name: req.body.file_hazard.name,
                executed: req.body.file_hazard.executed,
                signature: req.body.file_hazard.signature, 
                fire_extinguisher: req.body.file_hazard.fire_extinguisher, 
                water: req.body.file_hazard.water, 
                powder: req.body.file_hazard.powder, 
                co2: req.body.file_hazard.co2, 
                other_agent: req.body.file_hazard.other_agent, 
                other_agent_name:  req.body.file_hazard.other_agent_name,
                fire_blanket: req.body.file_hazard.fire_blanket, 
                connected_water_hose: req.body.file_hazard.connected_water_hose, 
                bucket_filled_water: req.body.file_hazard.bucket_filled_water, 
                notification_fire_department: req.body.file_hazard.notification_fire_department, 
                other_extingushing_agent: req.body.file_hazard.other_extingushing_agent, 
                firepost_name: req.body.file_hazard.firepost_name,
                during_file_hazardas_work_name: req.body.file_hazard.during_file_hazardas_work_name,
                fire_guard_name: req.body.file_hazard.fire_guard_name,
                after_completion_of_fire_hazardus: req.body.file_hazard.after_completion_of_fire_hazardus,
                duration: req.body.file_hazard.duration,
                hours: req.body.file_hazard.hours
            },
            explosion_hazard: {
                removal_of_explosive_substance: req.body.explosion_hazard.removal_of_explosive_substance,
                explosive_hazard_in_pipelines: req.body.explosion_hazard.explosive_hazard_in_pipelines,
                sealing_of_stationary_containers: req.body.explosion_hazard.sealing_of_stationary_containers,
                ventilation_measures: req.body.explosion_hazard.ventilation_measures,
                setting_up_gas_detector: req.body.explosion_hazard.setting_up_gas_detector,
                setting_up_gas_detector_text: req.body.explosion_hazard.setting_up_gas_detector_text,
                explosion_hazard_other: req.body.explosion_hazard.explosion_hazard_other,
                name: req.body.explosion_hazard.name,
                executed: req.body.explosion_hazard.executed,
                signature: req.body.explosion_hazard.signature,
                monitoring: req.body.explosion_hazard.monitoring,
                monitoring_name: req.body.explosion_hazard.monitoring_name,
                after_complete_fire_hazard: req.body.explosion_hazard.after_complete_fire_hazard,
                after_complete_fire_hazard_hours: req.body.explosion_hazard.after_complete_fire_hazard_hours,
                after_complete_fire_hazard_name: req.body.explosion_hazard.after_complete_fire_hazard_name,
            },
            alerting: {
                fire_alarm: req.body.alerting.fire_alarm,
                phone: req.body.alerting.phone,
                fire_department_call_no: req.body.alerting.fire_department_call_no,
            },
            client: {
                date: req.body.client.date,
                signature_of_plant_manager: req.body.client.signature_of_plant_manager
            },
            contractor: {
                date: req.body.contractor.date,
                signature_of_contractor: req.body.contractor.signature_of_contractor,
                signature: req.body.contractor.signature
            }
        
    }   
    if(req.params.id!=0){
        console.log(typeof req.params.id);
        CacheRelease.findOne({ _id: req.params.id, user: req.user._id }).exec(
            (err, document) => {
              if (err) {
                console.log("working");
                return res.status(400).json({
                  message: "Something Went Wrong",
                });
              } else if (document) {
                CacheRelease.updateOne(
                    { _id: req.params.id },
                    { $set: data },
                    { new: true },
                    (err3, form3) => {
                      if (err3) {
                        return res.status(404).json({
                          error: err3,
                        });
                      }
                
                      if (form3 === null) {
                        return res.status(404).json({
                          message: "No Data Found",
                        });
                      }
                
                      return res.json({ message: "Updated Successfully.", data: release });
                    }
                  );
              } else if (!document) {
                var release = new CacheRelease(data);
                release.save((err2, document2) => {
                  if (err2) {
                    return res.status(400).json({
                      message: err2,
                    });
                  }
                  return res.json({ message: "Saved Successfully.", data: release });
                });
              }
            }
          );
      }
      else{
        let release = new CacheRelease(data);
                release.save((err2, document2) => {
                  if (err2) {
                    return res.status(400).json({
                      message: err2,
                    });
                  }
                  return res.json({ message: "Saved Successfully.", data: release });
                });
      }
}

exports.createForm = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  

    data={
            user : req.user._id,
            location: req.body.location,
            sequence_no : req.body.sequence_no,
            job : {
                welding_cutting_process: req.body.job.welding_cutting_process,
                cutting_loop :  req.body.job.cutting_loop,
                soldering : req.body.job.soldering,
                defrost : req.body.job.defrost,
                hot_gluing : req.body.job.hot_gluing,
                job_check_other:  req.body.job.job_check_other,
                other_text:req.body.job.other_text
            },
            places_of_work : {
                work_location_position : req.body.places_of_work.work_location_position,
                perimeter: req.body.places_of_work.perimeter,
                height: req.body.places_of_work.height,
                depth: req.body.places_of_work.depth   
            },
            work_order: {
                working_methods: req.body.work_order.working_methods,
                to_be_caried_out: req.body.work_order.to_be_caried_out 
            },
            file_hazard: {
                removal_of_moveable_material: req.body.file_hazard.removal_of_moveable_material,
                removal_of_wall_celling: req.body.file_hazard.removal_of_wall_celling,
                coverage_stationary_material: req.body.file_hazard.coverage_stationary_material,
                sealing_of_openings: req.body.file_hazard.sealing_of_openings,
                file_hazard_other: req.body.file_hazard.file_hazard_other,
                name: req.body.file_hazard.name,
                executed: req.body.file_hazard.executed,
                signature: req.body.file_hazard.signature, 
                fire_extinguisher: req.body.file_hazard.fire_extinguisher, 
                water: req.body.file_hazard.water, 
                powder: req.body.file_hazard.powder, 
                co2: req.body.file_hazard.co2, 
                other_agent: req.body.file_hazard.other_agent, 
                other_agent_name:  req.body.file_hazard.other_agent_name,
                fire_blanket: req.body.file_hazard.fire_blanket, 
                connected_water_hose: req.body.file_hazard.connected_water_hose, 
                bucket_filled_water: req.body.file_hazard.bucket_filled_water, 
                notification_fire_department: req.body.file_hazard.notification_fire_department, 
                other_extingushing_agent: req.body.file_hazard.other_extingushing_agent, 
                firepost_name: req.body.file_hazard.firepost_name,
                during_file_hazardas_work_name: req.body.file_hazard.during_file_hazardas_work_name,
                fire_guard_name: req.body.file_hazard.fire_guard_name,
                after_completion_of_fire_hazardus: req.body.file_hazard.after_completion_of_fire_hazardus,
                duration: req.body.file_hazard.duration,
                hours: req.body.file_hazard.hours
            },
            explosion_hazard: {
                removal_of_explosive_substance: req.body.explosion_hazard.removal_of_explosive_substance,
                explosive_hazard_in_pipelines: req.body.explosion_hazard.explosive_hazard_in_pipelines,
                sealing_of_stationary_containers: req.body.explosion_hazard.sealing_of_stationary_containers,
                ventilation_measures: req.body.explosion_hazard.ventilation_measures,
                setting_up_gas_detector: req.body.explosion_hazard.setting_up_gas_detector,
                setting_up_gas_detector_text: req.body.explosion_hazard.setting_up_gas_detector_text,
                explosion_hazard_other: req.body.explosion_hazard.explosion_hazard_other,
                name: req.body.explosion_hazard.name,
                executed: req.body.explosion_hazard.executed,
                signature: req.body.explosion_hazard.signature,
                monitoring: req.body.explosion_hazard.monitoring,
                monitoring_name: req.body.explosion_hazard.monitoring_name,
                after_complete_fire_hazard: req.body.explosion_hazard.after_complete_fire_hazard,
                after_complete_fire_hazard_hours: req.body.explosion_hazard.after_complete_fire_hazard_hours,
                after_complete_fire_hazard_name: req.body.explosion_hazard.after_complete_fire_hazard_name,
            },
            alerting: {
                fire_alarm: req.body.alerting.fire_alarm,
                phone: req.body.alerting.phone,
                fire_department_call_no: req.body.alerting.fire_department_call_no,
            },
            client: {
                date: req.body.client.date,
                signature_of_plant_manager: req.body.client.signature_of_plant_manager
            },
            contractor: {
                date: req.body.contractor.date,
                signature_of_contractor: req.body.contractor.signature_of_contractor,
                signature: req.body.contractor.signature
            }
        
    }   
  
     
    
    form =new Form(data);
    form.save((err,document)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json(document);
    })
}



exports.getSingleForm =  (req,res)=>{
    let id = req.params.id;
    Form.findOne({_id:id,user:req.user._id}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(document);
    })    
}

exports.updateForm = (req,res) =>{
    console.log("request body::",req.body);
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
            sequence_no : req.body.sequence_no,
            job : {
                welding_cutting_process: req.body.job.welding_cutting_process,
                cutting_loop :  req.body.job.cutting_loop,
                soldering : req.body.job.soldering,
                defrost : req.body.job.defrost,
                hot_gluing : req.body.job.hot_gluing,
                job_check_other:  req.body.job.job_check_other,
                other_text:req.body.job.other_text
            },
            places_of_work : {
                work_location_position : req.body.places_of_work.work_location_position,
                perimeter: req.body.places_of_work.perimeter,
                height: req.body.places_of_work.height,
                depth: req.body.places_of_work.depth   
            },
            work_order: {
                working_methods: req.body.work_order.working_methods,
                to_be_caried_out: req.body.work_order.to_be_caried_out 
            },
            file_hazard: {
                removal_of_moveable_material: req.body.file_hazard.removal_of_moveable_material,
                removal_of_wall_celling: req.body.file_hazard.removal_of_wall_celling,
                coverage_stationary_material: req.body.file_hazard.coverage_stationary_material,
                sealing_of_openings: req.body.file_hazard.sealing_of_openings,
                file_hazard_other: req.body.file_hazard.file_hazard_other,
                other_text: req.body.file_hazard.other_text,
                name: req.body.file_hazard.name,
                executed: req.body.file_hazard.executed,
                signature: req.body.file_hazard.signature, 
                fire_extinguisher: req.body.file_hazard.fire_extinguisher, 
                other_extingushing_agent_name:req.body.file_hazard.other_extingushing_agent_name, 
                water: req.body.file_hazard.water, 
                powder: req.body.file_hazard.powder, 
                co2: req.body.file_hazard.co2, 
                other_agent: req.body.file_hazard.other_agent,  
                other_agent_name: req.body.file_hazard.other_agent_name, 
                fire_blanket: req.body.file_hazard.fire_blanket, 
                connected_water_hose: req.body.file_hazard.connected_water_hose, 
                bucket_filled_water: req.body.file_hazard.bucket_filled_water, 
                notification_fire_department: req.body.file_hazard.notification_fire_department, 
                other_extingushing_agent: req.body.file_hazard.other_extingushing_agent, 
                firepost_name: req.body.file_hazard.firepost_name,
                during_file_hazardas_work_name: req.body.file_hazard.during_file_hazardas_work_name,
                fire_guard_name: req.body.file_hazard.fire_guard_name,
                after_completion_of_fire_hazardus: req.body.file_hazard.after_completion_of_fire_hazardus,
                duration: req.body.file_hazard.duration,
                hours: req.body.file_hazard.hours
            },
            explosion_hazard: {
                removal_of_explosive_substance: req.body.explosion_hazard.removal_of_explosive_substance,
                explosive_hazard_in_pipelines: req.body.explosion_hazard.explosive_hazard_in_pipelines,
                sealing_of_stationary_containers: req.body.explosion_hazard.sealing_of_stationary_containers,
                ventilation_measures: req.body.explosion_hazard.ventilation_measures,
                setting_up_gas_detector: req.body.explosion_hazard.setting_up_gas_detector,
                setting_up_gas_detector_text: req.body.explosion_hazard.setting_up_gas_detector_text,
                explosion_hazard_other: req.body.explosion_hazard.explosion_hazard_other,
                other_text: req.body.explosion_hazard.other_text,
                name: req.body.explosion_hazard.name,
                executed: req.body.explosion_hazard.executed,
                signature: req.body.explosion_hazard.signature,
                monitoring: req.body.explosion_hazard.monitoring,
                monitoring_name: req.body.explosion_hazard.monitoring_name,
                after_complete_fire_hazard: req.body.explosion_hazard.after_complete_fire_hazard,
                after_complete_fire_hazard_hours: req.body.explosion_hazard.after_complete_fire_hazard_hours,
                after_complete_fire_hazard_name: req.body.explosion_hazard.after_complete_fire_hazard_name,
            },
            alerting: {
                fire_alarm: req.body.alerting.fire_alarm,
                phone: req.body.alerting.phone,
                fire_department_call_no: req.body.alerting.fire_department_call_no,
            },
            client: {
                date: req.body.client.date,
                signature_of_plant_manager: req.body.client.signature_of_plant_manager
            },
            contractor: {
                date: req.body.contractor.date,
                signature_of_contractor: req.body.contractor.signature_of_contractor,
                signature: req.body.contractor.signature
            }
        
    }  
  Form.updateOne(
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

exports.getCacheReleaseData = (req,res)=>{
    const location = req.params.location_id;
    CacheRelease.find({user:req.user._id,location: location}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(document);
    })    
}

exports.getFormData = (req,res)=>{
    const location = req.params.location_id;
    Form.find({user:req.user._id,location: location}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(document);
    })    
}

exports.deleteForm = (req,res) =>{
    let id = req.params.id;
    Form.deleteOne(
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

  exports.createpdf =  (req,res)=>{
    

    let options = { format: 'A4' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    
    let html = "<h1>Welcome to html-pdf-node</h1>" ;
    // or //
    //let file = { url: "https://example.com" };
    pdf.create(html, options).toFile('./uploads/businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
}