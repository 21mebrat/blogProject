const userModel = require('../models/userModel')
const appError = require('../middlewares/appError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../middlewares/email');  // Import the email middleware
const { trusted } = require('mongoose');
require('dotenv').config()

// user Registration

const registerUser = async (req, res, next) => {
    const { userName, password, email } = req.body
    try {
        if (!userName || !password || !email) return next(new appError('All Fields Are Required.', 403))
        const isUserExisting = await userModel.findOne({ email })
        if (isUserExisting) return next(new appError('There is someone with this email try again..', 409))
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = userModel({
            userName,
            password: hashedPassword,
            email,
            roles: { "user": 200 }
        })
        await newUser.save()
        res.status(200).json({ message: 'successfully registred' })

    } catch (error) {
        return next(new appError(error.message, 500))
    }

}


// handling login

const userLogin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!password || !email) return next(new appError('All Fields Are Required.', 403))
        const isUserExisting = await userModel.findOne({ email })
        if (!isUserExisting) return next(new appError('InCorrect Credientails.', 401))
        const isMatched = await bcrypt.compare(password, isUserExisting.password)
        if (!isMatched) return next(new appError('InCorrect Password.', 404))
        const role = Object.values(isUserExisting.roles)
        const accessToken = await jwt.sign(
            {
                userInfo: {
                    userId: isUserExisting._id,
                    roles: role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        )
        const refreshToken = await jwt.sign(
            {
                userInfo: {
                    userId: isUserExisting._id,
                    roles: role
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1h' }
        )
        await userModel.findByIdAndUpdate(isUserExisting._id, { refreshToken }, { new: true })
        res.cookie('token', refreshToken, { httpOnly: true, maxAge: 24 * 3600000 })
        res.status(200).json({
            message: 'login Successfully', user: {
                userName: isUserExisting.userName,
                accessToken,
                role: role
            }
        })

    } catch (error) {
        return next(new appError(error.message, 500))
    }
}

// get all users

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userModel.find({})
        res.status(200).json({ allUsers })
    } catch (error) {
        return next(new appError(error.message, 500))
    }

}

// user Logout

const userLogout = async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie) return res.sendStatus(204)
    const refreshToken = cookie.token
    try {
        const findUser = await userModel.findOne({ refreshToken })
        if (!findUser) {
            res.clearCookie('token', { httpOnly: true })
            return res.sendStatus(204)
        }
        await userModel.findByIdAndUpdate(findUser._id, { refreshToken: '' }, { new: true })
        res.clearCookie('token', { httpOnly: true })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }

}
const deleteUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await userModel.findByIdAndDelete(userId)
        if (!user) return next(new appError('user  no found.', 404))
        res.status(200).json({ message: 'Successfully  Deleted' })
    } catch (error) {
        return next(new appError(error.message, 500))
    }
}
const updateRole = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await userModel.findByIdAndUpdate(userId, { role: req.body.userInfo.role })
        if (!user) return next(new appError('user  no found.', 404))
        res.status(200).json({ message: 'Successfully  Updated' })
    } catch (error) {
        return next(new appError(error.message, 500))
    }
}
const updateUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await userModel.findByIdAndUpdate(userId, { userName: req.body.userName, email: req.body.email }, { new: true })
        if (!user) return next(new appError('user  no found.', 404))
        res.status(200).json({ message: 'Successfully  Updated' })
    } catch (error) {
        return next(new appError(error.message, 500))
    }
}

const changePassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const resetLink = `http://localhost:5173/reset-password?email=${email}`;
        const emailHtml = `
          <h1>Password Reset Request</h1>
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <p><a href="${resetLink}" style="color: blue; text-decoration: underline;">Reset Password</a></p>
          <p>If you did not request this, please ignore this email.</p>
        `;

        await sendEmail(user.email, 'Password Reset Request', emailHtml);

        res.status(200).json({ message: 'Password reset link sent to your email please check your email.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const resetPassword = async (req, res, next) => {
    const { email, newPassword } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) return next(new appError('user  no found.', 404))
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true })
        res.status(200).json({ message: 'successfully update the password' })

    } catch (error) {
        return next(new appError(error.message, 500))
    }
}

module.exports = {
    registerUser,
    userLogin,
    getAllUsers,
    userLogout,
    deleteUser,
    updateRole,
    updateUser,
    changePassword,
    resetPassword
}