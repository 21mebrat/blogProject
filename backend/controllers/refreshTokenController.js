const jwt = require("jsonwebtoken")
const appError = require("../middlewares/appError")
const userModel = require("../models/userModel")

const handleRefreshToken = async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie) return res.sendStatus(403)
    const refreshToken = cookie.token
    try {
        const findUser = await userModel.findOne({ refreshToken })
        if (!findUser) return res.sendStatus(400)
            const role = Object.values(findUser.roles)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || findUser.id !== decoded.userInfo.userId) return res.sendStatus(401)
            const accessToken = jwt.sign({
                userInfo: {
                    userId: findUser._id,
                    roles: role
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            )
            res.status(200).json({ accessToken,role})
        })
    } catch (err) {
        console.log(err)
        next(new appError(err.message, 500))
    }


}

module.exports = handleRefreshToken