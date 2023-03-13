const Location = require("../models/location");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createLocation = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  location_image = (typeof(req.files.location_image) != "undefined" && req.files.location_image !== null) ? req.files.location_image[0].filename : null; 
  company_logo = (typeof(req.files.company_logo) != "undefined" && req.files.company_logo !== null) ? req.files.company_logo[0].filename : null; 
    data={
        company_name : req.body.company_name,
        house_number : req.body.house_number,
        street : req.body.street,
        postal_code : req.body.postal_code,
        city : req.body.city,
        location_image : location_image,
        show_as : req.body.show_as,
        location : req.body.location,
        company_logo : company_logo,
        no_of_members : req.body.no_of_members,
        percentage : req.body.percentage,
        note : req.body.note,
        user : req.user._id
    }    
    
    location =new Location(data);
    location.save((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db"
            })
        }
        return res.json(location);
    })
}

exports.updateLocation =async (req,res) =>{
    let id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
            company_name : req.body.company_name,
            house_number : req.body.house_number,
            street : req.body.street,
            postal_code : req.body.postal_code,
            city : req.body.city,
            show_as : req.body.show_as,
            location : req.body.location,
            no_of_members : req.body.no_of_members,
            percentage : req.body.percentage,
            note : req.body.note,
            user : req.user._id
        }    
        if(req.files !== null && typeof(req.files) != "undefined"){    
    if( typeof(req.files.company_logo) != "undefined" && req.files.company_logo !== null){
        data.company_logo = req.files.company_logo[0].filename;
    }
    if(typeof(req.files.location_image) != "undefined" && req.files.location_image !== null){
        data.location_image = req.files.location_image[0].filename;
    }
}
    
      
    await Location.findOne({_id:id,user:req.user._id}).exec((err,l)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        if(req.files !== null && typeof(req.files) != "undefined"){        
        if(typeof(req.files.location_image) != "undefined" && req.files.location_image !== null){
            fs.unlink('./uploads/location'+l.location_image, function (err) {
                console.log('File deleted!');
            });
        }
        if(typeof(req.files.company_logo) != "undefined" && req.files.company_logo !== null){
            fs.unlink('./uploads/location'+l.company_logo, function (err) {
                console.log('File deleted!');
            });
        }
    }
    })    

    await Location.findOneAndUpdate(
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

exports.getSingleLocation =  (req,res)=>{
    let id = req.params.id;
    Location.findOne({_id:id,user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(location);
    })    
}

exports.getLocationData = (req,res)=>{
    Location.find({user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(location);
    })    
}


exports.deleteLocation = (req,res) =>{
    let id = req.params.id;
    Location.deleteOne(
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