const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'name is required'],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    }

},{timestamps:true})

module.exports = mongoose.model('User',UserSchema);