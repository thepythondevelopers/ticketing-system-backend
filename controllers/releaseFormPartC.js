const ReleaseFormPartC = require("../models/releaseFormPartC");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createFormPartC = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
   
  file_upload = (typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null) ? req.files.file_upload[0].filename : null; 
    data={
        introduction : req.body.introduction,
        fire_protection : req.body.fire_protection,
        alert_procedure : req.body.alert_procedure,
        safety_measures : req.body.safety_measures,
        extingush_measure : req.body.extingush_measure,
        fire_department : req.body.fire_department,
        aftercare : req.body.aftercare,
        site_specific : req.body.site_specific,
        appendix : req.body.appendix,
        file_upload : file_upload,
        user : req.user._id
    }    
    
    releaseFormPartC =new ReleaseFormPartC(data);
    releaseFormPartC.save((err,release)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db",
                error : err
            })
        }
        return res.json(release);
    })
}

exports.updateFormPartC = async (req,res) =>{
    let id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

    data={
        introduction : req.body.introduction,
        fire_protection : req.body.fire_protection,
        alert_procedure : req.body.alert_procedure,
        safety_measures : req.body.safety_measures,
        extingush_measure : req.body.extingush_measure,
        fire_department : req.body.fire_department,
        aftercare : req.body.aftercare,
        site_specific : req.body.site_specific,
        appendix : req.body.appendix
    }

    if(req.files !== null && typeof(req.files) != "undefined"){    
    
    if(typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null){
        data.file_upload = req.files.file_upload[0].filename;
    }
} 

await ReleaseFormPartC.findOne({_id:id,user:req.user._id}).exec((err,l)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        if(req.files !== null && typeof(req.files) != "undefined"){        
        
        if(typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null){
            fs.unlink('./uploads/releaseform'+l.file_upload, function (err) {
                console.log('File deleted!');
            });
        }
    }
    })   
    
    await ReleaseFormPartC.updateOne(
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


exports.getSingleFormC =  (req,res)=>{
    let id = req.params.id;
    ReleaseFormPartC.findOne({_id:id,user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(location);
    })    
}

exports.getFormCData = (req,res)=>{
    ReleaseFormPartC.find({user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(location);
    })    
}


exports.deleteFormC = (req,res) =>{
    let id = req.params.id;
    ReleaseFormPartC.deleteOne(
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