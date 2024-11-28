const express = require('express')
const cookie = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const refreshRoutes = require('./routes/refreshTokenRoutes')
const blogRoute = require('./routes/blogRoutes')
const commentRoute= require('./routes/commentRoute')
require('dotenv').config()
const path = require('path')
const cors = require('cors')
const dbConnection = require('./Config/db')


const app = express()

// Globall middlewares
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))
app.use(express.json())
app.use(cookie())
app.use(express.static(path.join(__dirname,"uploads")))
 // my app here
 app.use('/api/user/',userRoutes)
 app.use('/api/refresh/',refreshRoutes)
 app.use('/api/blog/',blogRoute)
 app.use('/api/comment/',commentRoute)


 app.use((err,req,res,next)=>{
    if (err.isOperational) {
        err.statusCode = err.statusCode || 500,
            err.status = err.status || 'error'

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })

    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'something go very wrong'
        })
        console.log(err)
    }
})
const server =() =>{ 
    dbConnection()
    app.listen(process.env.PORT,()=>console.log('server is runing on '+ process.env.PORT))
}

server()