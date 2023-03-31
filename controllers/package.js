const Package = require("../models/package");
const {validationResult} = require("express-validator");

exports.createPackage = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
        title : req.body.title,
        price : req.body.price,
        package_include : req.body.package_include, 
        note : req.body.note
    }    
    const s_package =new Package(data);
    s_package.save((err,d_package)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to sabe in db"
            })
        }
        return res.json(d_package);
    })
}

exports.getPackage = (req,res)=>{

    Package.find().exec((err,d_package)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(d_package);
    })    
}


exports.getPackageById =  (req,res)=>{
    Package.findOne({_id:req.params.id}).exec((err,d_package)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(d_package);
    })    
}


exports.updatePackage = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    title : req.body.title,
    price : req.body.price,
    package_include : req.body.package_include, 
    note : req.body.note
  }
  Package.findOneAndUpdate(
    {_id : id},
    {$set : data},
    {new: true},
    (err,d_package) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(d_package===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(d_package);
    }
    )   
}

exports.deletePackage = (req,res) =>{
    let id = req.params.id;
    Package.deleteOne(
        {_id : id,user:req.user._id},
        (err,d_package) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            if(d_package.deletedCount==1){
                return res.json({id : id});
            }
            if(d_package.deletedCount==0){
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
 