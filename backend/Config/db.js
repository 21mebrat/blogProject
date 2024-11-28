const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = async()=>{
    try{
await mongoose.connect(process.env.DB_CONNCTION_STRING)
console.log('db conncts successfully')  
    }catch(err){
    console.log("db connection fails",err)

    }
}
module.exports = dbConnection

