const Plan = require("../models/plan");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createPlan = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  if(req.files && Object.entries(req.files).length === 0){
    return res.status(400).json({
        message : "Please upload document or document is not in right format"
    })
}



    data={
        file_name : req.body.file_name,
        user : req.user._id, 
        location : req.body.location,
        date : req.body.date, 
        upload_document : req.files.upload_document[0].filename,
        document_original_name : req.files.upload_document[0].originalname,
        calendar_reminder_interval : req.body.calendar_reminder_interval,
        
        note_item : req.body.note_item,
        note_create_task : req.body.note_create_task
    }   
    if( req.body.calendar_reminder_choose_date != "null"){
        data.calendar_reminder_choose_date  = req.body.calendar_reminder_choose_date;
    }
    if( req.body.category != "null"){
        data.category  = req.body.category;
    }
     
    
    plan =new Plan(data);
    plan.save((err,document)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json(document);
    })
}

exports.updatePlan =async (req,res) =>{
    let id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
        file_name : req.body.file_name,
        date : req.body.date, 
        calendar_reminder_interval : req.body.calendar_reminder_interval,
        note_item : req.body.note_item,
        note_create_task : req.body.note_create_task
        }
        if( req.body.category != "null"){
            data.category  = req.body.category;
        }    
        if( req.body.calendar_reminder_choose_date != "null"){
            data.calendar_reminder_choose_date  = req.body.calendar_reminder_choose_date;
        }
        if(req.files !== null && typeof(req.files) != "undefined"){    
    if( typeof(req.files.upload_document) != "undefined" && req.files.upload_document !== null){
        data.upload_document = req.files.upload_document[0].filename;
        data.document_original_name = req.files.upload_document[0].originalname;
    }
}
    
      
    await Plan.findOne({_id:id,user:req.user._id}).exec((err,l)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        if(req.files !== null && typeof(req.files) != "undefined"){        
        if(typeof(req.files.upload_document) != "undefined" && req.files.upload_document !== null){
            fs.unlink('./uploads/plan'+l.upload_document, function (err) {
                console.log('File deleted!');
            });
        }
    }
    })    

    await Plan.findOneAndUpdate(
        {_id : id,user:req.user._id},
        {$set : data},
        {new: true},
        (err,document) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
    
            if(document===null){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
    
            return res.json(document);
        }
        )
}

exports.getSinglePlan =  (req,res)=>{
    let id = req.params.id;
    Plan.findOne({_id:id,user:req.user._id}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(document);
    })    
}

exports.getPlanData = (req,res)=>{
    const location = req.params.location_id;
    Plan.find({user:req.user._id,location: location}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(document);
    })    
}


exports.deletePlan = (req,res) =>{
    let id = req.params.id;
    Plan.deleteOne(
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