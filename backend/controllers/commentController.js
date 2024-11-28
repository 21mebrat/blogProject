const blogModel = require('../models/blogModel')
const commentModel = require('../models/commentModel')

const appError = require('../middlewares/appError')


const postComment = async (req, res, next) => {
    const {userId} = req.body.userInfo
    try {
        const newComment = new commentModel({ ...req?.body,user:userId})
        await newComment.save()

        res.status(200).json({ message: 'comments Successfuly Created', comment: { ...newComment._doc } })
    } catch (error) {
        next(new appError(error.message, 500))
    }
}
const getAllComments = async (req, res, next) => {
    try {
        const totalComment =await commentModel.countDocuments({})
        res.status(200).json({ totalComment })
    } catch (error) {
        next(new appError(error.message, 500))
    }
}


module.exports = {
    postComment,
    getAllComments
}
