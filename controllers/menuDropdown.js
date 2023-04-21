const MenuDropdown = require("../models/menuDropdown");
const {validationResult} = require("express-validator");

exports.createdropDown = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
        event_calender : req.body.event_calender,
        note : req.body.note,
        board_fixed : req.body.board_fixed,
        user : req.user._id,
        location : req.body.location
    }
  
    menuDropdown =new MenuDropdown(data);
    menuDropdown.save((err,data)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to sabe in db"
            })
        }
        return res.json(data);
    })
}

exports.getMenuDropdownData = (req,res)=>{
    MenuDropdown.find({user:req.user._id,location:req.params.location_id}).exec((err,data)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(data);
    })    
}

exports.getMenuDropdownDataId =  (req,res)=>{
    id = req.params.id;
    MenuDropdown.findOne({_id:id,user:req.user._id}).exec((err,data)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(data);
    })    
}

exports.updateMenuDropdown = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    event_calender : req.body.event_calender,
    note : req.body.note,
    board_fixed : req.body.board_fixed
  }
  MenuDropdown.updateOne(
    {_id : id,user:req.user._id},
    {$set : data},
    {new: true},
    (err,data) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }
        if(data===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(data);
    }
    )   
}

exports.deleteMenuDropDown = (req,res) =>{
    let id = req.params.id;
    MenuDropdown.deleteOne(
        {_id : id,user:req.user._id},
        (err,data) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(data.deletedCount==1){
                return res.json({id : id});
            }
            if(data.deletedCount==0){
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