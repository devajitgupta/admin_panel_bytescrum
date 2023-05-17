const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type:String},
    email:{

        type:String,
    },
    password:{
        type:String,
    
    },
    role:{
        type:String,
        enum:['admin','manager', 'employee'],
        default:'employee'
    }
});

/*
const mongoose=require('mongoose');
const Role = require('../models/role');

const userSchema= new mongoose.Schema({
    role_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Role
    },
    name:{
        type:String},
    email:{

        type:String,
    },
    password:{
        type:String,
    
    },
});


module.exports=mongoose.model('User',userSchema);
*/


module.exports=mongoose.model('User',userSchema);