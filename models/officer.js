const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const officerSchema = new Schema({
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    managing_director : {
        name: {
            type: String
        },
        first_name:{
            type: String
            },
        contact_number:{
            type: Number
        },
        email:{
            type: String
        }
    },
    deputy_managing_director : {
        name: {
            type: String
        },
        first_name:{
            type: String
            },
        contact_number:{
            type: Number
        },
        email:{
            type: String
        }
    },
    object_director : {
        name: {
            type: String
        },
        first_name:{
            type: String
            },
        contact_number:{
            type: Number
        },
        email:{
            type: String
        }
    },
    responsible_fire_protection : {
        name: {
            type: String
        },
        first_name:{
            type: String
            },
        contact_number:{
            type: Number
        },
        email:{
            type: String
        }
    },
    fire_protection_officer : {
        name: {
            type: String
        },
        first_name:{
            type: String
            },
        contact_number:{
            type: Number
        },
        email:{
            type: String
        }
    },
    helpers : {
        number_target:{
            type: Number
        },
        actual_target:{
            type: Number
        },
    },
    
},{timestamps: true});

module.exports = mongoose.model("Officer",officerSchema);
