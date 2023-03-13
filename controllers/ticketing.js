const Ticketing = require("../models/ticketing");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createTicket = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  ticketing = (typeof(req.files.ticketing) != "undefined" && req.files.ticketing !== null) ? req.files.ticketing[0].filename : null; 
    data={
        ticketing : ticketing,
        user : req.user._id
    }    
    
    ut =new Ticketing(data);
    ut.save((err,ut)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db"
            })
        }
        return res.json(ut);
    })
}

exports.updateTicket =async (req,res) =>{
    let id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    
        if(req.files !== null && typeof(req.files) != "undefined"){    
    
    if(typeof(req.files.ticketing) != "undefined" && req.files.ticketing !== null){
        data.ticketing = req.files.ticketing[0].filename;
    }
    
    await Ticketing.findOne({_id:id,user:req.user._id}).exec((err,l)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        if(req.files !== null && typeof(req.files) != "undefined"){        
        if(typeof(req.files.ticketing) != "undefined" && req.files.ticketing !== null){
            fs.unlink('./uploads/ticketing'+l.ticketing, function (err) {
                console.log('File deleted!');
            });
        }

    }
    })    

    await Ticketing.findOneAndUpdate(
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


exports.getSingleTicket =  (req,res)=>{
    let id = req.params.id;
    Ticketing.findOne({_id:id,user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(location);
    })    
}

exports.getTicketData = (req,res)=>{
    Ticketing.find({user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(location);
    })    
}


exports.deleteTicket = (req,res) =>{
    let id = req.params.id;
    Ticketing.deleteOne(
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