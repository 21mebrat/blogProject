const jwt = require('jsonwebtoken')
require('dotenv').config()
const appError = require('./appError')

const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) return next(new appError('Header are not sent', 403))
    const token = authHeader.split(' ')[1]
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return next(new appError('Invalid Token Please login again', 403))
        req.body.userInfo = decoded.userInfo
        next()

    })

}

module.exports = verifyUser