const UploadTemplate = require("../models/uploadTemplate");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createUploadTemplate = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  template = (typeof(req.files.template) != "undefined" && req.files.template !== null) ? req.files.template[0].filename : null; 
    data={
        template : template,
        user : req.user._id
    }    
    
    ut =new UploadTemplate(data);
    ut.save((err,ut)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db"
            })
        }
        return res.json(ut);
    })
}

exports.updateUploadTemplate =async (req,res) =>{
    let id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    
        if(req.files !== null && typeof(req.files) != "undefined"){    
    
    if(typeof(req.files.template) != "undefined" && req.files.template !== null){
        data.template = req.files.template[0].filename;
    }
    
    await UploadTemplate.findOne({_id:id,user:req.user._id}).exec((err,l)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        if(req.files !== null && typeof(req.files) != "undefined"){        
        if(typeof(req.files.template) != "undefined" && req.files.template !== null){
            fs.unlink('./uploads/template'+l.template, function (err) {
                console.log('File deleted!');
            });
        }

    }
    })    

    await UploadTemplate.updateOne(
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
}else{
    return res.json({message : 'No Input Requested.'})
}
    
      
}


exports.getSingleTemplate =  (req,res)=>{
    let id = req.params.id;
    UploadTemplate.findOne({_id:id,user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(location);
    })    
}

exports.getUploadDataData = (req,res)=>{
    UploadTemplate.find({user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(location);
    })    
}


exports.deleteUploadData = (req,res) =>{
    let id = req.params.id;
    UploadTemplate.deleteOne(
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