const Evacuation = require("../models/evacuation");
const {validationResult} = require("express-validator");
const User = require("../models/user");

exports.createEvacuation = (req,res) =>{
    const errors = validationResult(req);
    console.log("errors from evaluation::",errors);
    console.log("request from evaluation::",req.body);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  
    data={
        user : req.user._id,
        location : req.body.location,
        evacuation_nr : req.body.evacuation_nr,
        date : req.body.date,
        general : req.body.general,
        procedure : req.body.procedure,
        evacuation_time : req.body.evacuation_time,
        deficiency : req.body.deficiency
    }   
    
     
    
    var evacuation =new Evacuation(data);
    evacuation.save((err,document)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json({message : 'Saved Successfully.','data':evacuation});
    })
}

exports.getSingleEvacuation =  (req,res)=>{
    let id = req.params.id;
    Evacuation.findOne({_id:id,user:req.user._id}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(document);
    })    
}

exports.updateEvacuation = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
        evacuation_nr : req.body.evacuation_nr,
        date : req.body.date,
        general : req.body.general,
        procedure : req.body.procedure,
        evacuation_time : req.body.evacuation_time,
        deficiency : req.body.deficiency
    }  
    Evacuation.findOneAndUpdate(
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

exports.getEvacuationData = (req,res)=>{
    const location = req.params.location_id;
    Evacuation.find({user:req.user._id,location: location}).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(document);
    })    
}

exports.totalEvacuation = (req,res)=>{
    User.find({"email":req.params.email}).select('_id').exec((err,document)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        if(document){
            console.log("document._id::",document[0]._id)
            Evacuation.find({user:document[0]._id}).exec((err2,document2)=>{
                if(err2){
                    return res.status(400).json({
                        message : "Something Went Wrong"
                    })
                }
                else if(document2){
                    console.log(document2);
                    return res.json(document2);
                }
                else{
                    return res.json({"length":"0"});
                }
            })  
        }
        else{
            return res.json({"msg":"No such user found"});
        }
        
    })    
}

exports.deleteEvacuation = (req,res) =>{
    let id = req.params.id;
    Evacuation.deleteOne(
        {_id : id,user:req.user._id},
        (err,document) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(document.deletedCount==1){
                //return res.json({id : id});
                return res.json({message : "Evacuation deleted successfully"})
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