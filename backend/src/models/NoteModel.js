const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    content:{
        type:String,
        required:[true, 'content is required']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:UserModel,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Notes',NoteSchema);