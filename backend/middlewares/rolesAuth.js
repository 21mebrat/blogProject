const appError = require("./appError")


const verifyRole = (...allowedRoles) => {
    return (req,res,next)=>{ 
    const { roles } = req.body.userInfo
    if (!roles) return next(new appError('Please Login Firest', 401))
        const roleArray = [...allowedRoles]
    const result = roles.some(role => roleArray.includes(role))
    if (!result) return next(new appError('Please Login Firest last', 401))
    next()

    }
}

module.exports = verifyRole