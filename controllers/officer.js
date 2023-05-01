const Officer = require("../models/officer");
const {validationResult} = require("express-validator");


exports.createOfficer = async (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  if(req.body.helpers){
    if(req.body.helpers.number_target>req.body.helpers.actual_target){
        return res.status(400).json({"error":"Actual cannot be  less than target"});
    }
  }
  await Officer.find({user:req.user._id,location:req.body.location}).exec(async (err,officer)=>{
    if(err){
        return res.status(400).json({
            message : "Something Went Wrong"
        })
    }
    else if(officer.length>0){
        /*console.log("user",req.user._id,"location",req.body.location);
        return res.status(400).json({"error":"Already Exists"});*/
        data={
            user : req.user._id, 
            location : req.body.location,
            managing_director : req.body.managing_director,
            deputy_managing_director : req.body.deputy_managing_director, 
            object_director : req.body.object_director,
            responsible_fire_protection : req.body.responsible_fire_protection,
            fire_protection_officer : req.body.fire_protection_officer,
            helpers : req.body.helpers
        }  
        await Officer.updateOne(
            {user:req.user._id,location:req.body.location},
            {$set : data},
            {new: true},
            (err,updated_officer) => {
                if(err){
                    return res.status(404).json({
                        error : err
                    })
                
                }
        
                if(updated_officer===null){
                    return res.status(404).json({
                        message : "No Data Found"
                    })
                }
        
                return res.json({message : 'Updated Successfully.'});
            }
            )
    }
    else{
        data={
            user : req.user._id, 
            location : req.body.location,
            managing_director : req.body.managing_director,
            deputy_managing_director : req.body.deputy_managing_director, 
            object_director : req.body.object_director,
            responsible_fire_protection : req.body.responsible_fire_protection,
            fire_protection_officer : req.body.fire_protection_officer,
            helpers : req.body.helpers
        }   
        
        officer =new Officer(data);
        await officer.save((err,document)=>{
            if(err){
                return res.status(400).json({
                    message : err
                })
            }
            return res.json({message : 'Saved Successfully.'});
        })
    }
    })
}


exports.getOfficer =  (req,res)=>{
    if(req.body.location){
        console.log("req.body.location::",req.body.location);
        Officer.find({user:req.user._id,location:req.body.location}).exec((err,officer)=>{
            if(err){
                return res.status(400).json({
                    message : "Something Went Wrong"
                })
            }
            return res.json(officer);
        })  
    }  
    else{
        return res.status(400).json({"error":"Providing a location is must"});
    }
}

exports.getOfficerById =  (req,res)=>{
    Officer.findOne({_id:req.params.id,user:req.user._id}).exec((err,officer)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(officer);
    })    
}