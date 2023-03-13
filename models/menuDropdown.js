const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const menuDropdownSchema = new Schema({
    event_calender:{
        type:Boolean,
        default:1, //0=>False 1=>True/Active
        required : true
    },
    note:{
        type:Boolean,
        default:1, //0=>False 1=>True/Active
        required : true
    },
    board_fixed:{
        type:Boolean,
        default:1, //0=>False 1=>True/Active
        required : true
    },
    location :{
        type : ObjectId,
        ref: "Location",
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("MenuDropdown",menuDropdownSchema);

