const Officer = require("../models/officer");
const {validationResult} = require("express-validator");


exports.createOfficer = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  
    data={
        user : req.user._id, 
        managing_director : req.body.managing_director,
        deputy_managing_director : req.body.deputy_managing_director, 
        object_director : req.body.object_director,
        responsible_fire_protection : req.body.responsible_fire_protection,
        fire_protection_officer : req.body.fire_protection_officer,
        helpers : req.body.helpers
    }   
    
     
    
    officer =new Officer(data);
    officer.save((err,document)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json({message : 'Saved Successfully.'});
    })
}


exports.getOfficer =  (req,res)=>{
    Officer.find({user:req.user._id}).exec((err,officer)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(officer);
    })    
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