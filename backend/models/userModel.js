const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    refreshToken:{type:String,},
    roles:{
        user:{type:Number,default:200},
        admin:{type:Number},
        editor:{type:Number}
    },
})


const userModel = mongoose.models.BlogUsers || mongoose.model('blogUser',userSchema)
module.exports = userModel
