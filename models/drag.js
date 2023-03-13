const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const dragSchema = new Schema({
    

    data:{
        type:String,
        required : true,
      },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    location :{
        type : ObjectId,
        ref: "Location",
        required : true
    }
    
},{timestamps: true});
// dragSchema.set('toJSON', { virtuals: true })
// dragSchema.virtual('data_content').
//   get(function() { return JSON.parse(this.data); }).
//   set(function(v) {
//     const data = JSON.stringify(v);
//     this.set({ data });
//   });
module.exports = mongoose.model("Drag",dragSchema);
