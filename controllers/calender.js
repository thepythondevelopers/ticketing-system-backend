const Calender = require("../models/calender");
const {validationResult} = require("express-validator");
var fs = require('fs');
exports.createCalender = (req,res) =>{
    console.log("request from create calender::",req.body);
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  //file_upload = (typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null) ? req.files.file_upload[0].filename : null; 
  data = {
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        title : req.body.title,
        notes : req.body.notes,
        user : req.user._id,
        location : req.body.location,
        //file_upload : file_upload
    }
  
    calender =new Calender(data);
    calender.save((err,calender)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to sabe in db"
            })
        }
        return res.json(calender);
    })
}

exports.getCalenderData = (req,res)=>{
    Calender.find({user:req.user._id,location:req.params.location_id}).exec((err,calender)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(calender);
    })    
}

exports.updateCalender = async (req,res) =>{
    let id = req.params.id;

    data = {
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    title : req.body.title,
    notes : req.body.notes
  }
    if(req.files !== null && typeof(req.files) != "undefined"){    
        if( typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null){
            data.file_upload = req.files.file_upload[0].filename;
        }
    }
    
    if(req.files !== null && typeof(req.files) != "undefined"){        
        if(typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null){
        await Calender.findOne({_id:id,user:req.user._id}).exec((err,c)=>{
            if(err){
                return res.status(400).json({
                    message : "Something Went Wrong"
                })
            }
        
            fs.unlink('./uploads/calender'+c.file_upload, function (err) {
                console.log('File deleted!');
            });
        
        })  
        }
        
    }  

    console.log("_id::",id,"user::",req.user._id);
    await Calender.findOneAndUpdate(
        {_id : id,user:req.user._id},
        {$set : data},
        {new: true},
        (err,calender) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
    
            if(calender===null){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
    
            return res.json(calender);
        }
        )
}

exports.deleteCalender = (req,res) =>{
    let id = req.params.id;
    Calender.deleteOne(
        {_id : id,user:req.user._id},
        (err,calender) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(calender.deletedCount==1){
                return res.json({id : id});
            }
            if(calender.deletedCount==0){
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