const ReleaseFormPartB = require("../models/releaseFormPartB");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createFormPartB = (req,res) =>{
    console.log(req);
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  fire_security_regulation = (typeof(req.files.fire_security_regulation) != "undefined" && req.files.fire_security_regulation !== null) ? req.files.fire_security_regulation[0].filename : null; 
  file_upload = (typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null) ? req.files.file_upload[0].filename : null; 

  data={
        introduction : req.body.introduction,
        fire_security_regulation : fire_security_regulation,
        fire_protection : req.body.fire_protection,
        fire_smoke_propegation : req.body.fire_smoke_propegation,
        rescue_routes : req.body.rescue_routes,
        sihnalization : req.body.sihnalization,
        behaviour : req.body.behaviour,
        report_fire : req.body.report_fire,
        observaion_alarm : req.body.observaion_alarm,
        bring_to_safety : req.body.bring_to_safety,
        attemp_extingush : req.body.attemp_extingush,
        special_rule : req.body.special_rule,
        appendix : req.body.appendix,
        file_upload : file_upload,
        user : req.user._id
    }    
    
    releaseFormPartB =new ReleaseFormPartB(data);
    releaseFormPartB.save((err,release)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db",
                error : err
            })
        }
        return res.json(release);
    })
}


exports.updateFormPartB = async (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

    data={
        introduction : req.body.introduction,
        fire_security_regulation : fire_security_regulation,
        fire_protection : req.body.fire_protection,
        fire_smoke_propegation : req.body.fire_smoke_propegation,
        rescue_routes : req.body.rescue_routes,
        sihnalization : req.body.sihnalization,
        behaviour : req.body.behaviour,
        report_fire : req.body.report_fire,
        observaion_alarm : req.body.observaion_alarm,
        bring_to_safety : req.body.bring_to_safety,
        attemp_extingush : req.body.attemp_extingush,
        special_rule : req.body.special_rule,
        appendix : req.body.appendix,
        file_upload : file_upload,
        user : req.user._id
    }

    if(req.files !== null && typeof(req.files) != "undefined"){    
    if( typeof(req.files.fire_security_regulation) != "undefined" && req.files.fire_security_regulation !== null){
        data.fire_security_regulation = req.files.fire_security_regulation[0].filename;
    }
    if(typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null){
        data.file_upload = req.files.file_upload[0].filename;
    }
} 

await ReleaseFormPartB.findOne({_id:id,user:req.user._id}).exec((err,l)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        if(req.files !== null && typeof(req.files) != "undefined"){        
        if(typeof(req.files.fire_security_regulation) != "undefined" && req.files.fire_security_regulation !== null){
            fs.unlink('./uploads/releaseform'+l.fire_security_regulation, function (err) {
                console.log('File deleted!');
            });
        }
        if(typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null){
            fs.unlink('./uploads/releaseform'+l.file_upload, function (err) {
                console.log('File deleted!');
            });
        }
    }
    })   
    
    await ReleaseFormPartB.findOneAndUpdate(
        {_id : id,user:req.user._id},
        {$set : data},
        {new: true},
        (err,location) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
    
            if(location===null){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
    
            return res.json(location);
        }
        )
}


exports.getSingleFormB =  (req,res)=>{
    let id = req.params.id;
    ReleaseFormPartB.findOne({_id:id,user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(location);
    })    
}

exports.getFormBData = (req,res)=>{
    ReleaseFormPartB.find({user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(location);
    })    
}


exports.deleteFormB = (req,res) =>{
    let id = req.params.id;
    ReleaseFormPartB.deleteOne(
        {_id : id,user:req.user._id},
        (err,location) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(location.deletedCount==1){
                return res.json({id : id});
            }
            if(location.deletedCount==0){
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