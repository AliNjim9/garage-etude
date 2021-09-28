//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    id:{type:String}
});
module.exports= mongoose.model("User",userSchema);
   