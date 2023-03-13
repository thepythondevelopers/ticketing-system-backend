const Category = require("../models/category");
const {validationResult} = require("express-validator");

exports.createCategory = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
        title : req.body.title,
        color : req.body.color, 
        user : req.user._id
    }    
    category =new Category(data);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db"
            })
        }
        return res.json(category);
    })
}

exports.getCategoryData = (req,res)=>{

    Category.find({user:req.user._id}).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(category);
    })    
}

exports.getSingleCategoryData = (req,res)=>{

    Category.find({user:req.user._id,_id:req.params.id}).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(category);
    })    
}

exports.updateCategory = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  
    data={
        title : req.body.title,
        color : req.body.color
    }    
  
  Category.findOneAndUpdate(
    {_id : id,user:req.user._id},
    {$set : data},
    {new: true},
    (err,category) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }
        if(category===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(category);
    }
    )   
}



  exports.deleteCategory = (req,res) =>{
    let id = req.params.id;
    Category.deleteOne(
        {_id : id,user:req.user._id},
        (err,category) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            }
            
            if(category.deletedCount==1){
                return res.json({id : id});
            }
            if(category.deletedCount==0){
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