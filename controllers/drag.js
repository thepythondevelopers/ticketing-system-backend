const Drag = require("../models/drag");
const {validationResult} = require("express-validator");

exports.createDrag = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

    data={
        data : JSON.stringify(req.body.data),
        user : req.user._id,
        location : req.body.location
    }    
    drag =new Drag(data);
    drag.save((err,order)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json(drag);
    })
}

exports.getDragData = (req,res)=>{

    Drag.find({user:req.user._id,location:req.params.location_id}).exec((err,drag)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(drag);
    })    
}

exports.updateDrag = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    data : JSON.stringify(req.body.data)
  }
  Drag.updateOne(
    {_id : id,user:req.user._id},
    {$set : data},
    {new: true},
    (err,drag) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }
        if(drag===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(drag);
    }
    )   
}

exports.deleteDrag = (req,res) =>{
    let id = req.params.id;
    Drag.deleteOne(
        {_id : id,user:req.user._id},
        (err,drag) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(drag.deletedCount==1){
                return res.json({id : id});
            }
            if(drag.deletedCount==0){
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

  exports.deleteAllDrag = (req,res) =>{
    
    Drag.remove({}, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        
    });
   
    return res.json({message:"Delete All Drag Records Succcessfully."})
  }  