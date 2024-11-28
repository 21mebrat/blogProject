const blogModel = require('../models/blogModel')
const appError = require('../middlewares/appError')
const commentModel = require('../models/commentModel')
const auth = require('../middlewares/auth')
//get blogs

const getBlogs = async (req, res, next) => {
    const { search, category, location } = req?.query
    console.log(search)
    let query = {}
    if (search) {
        query = {
            ...query,
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ]
        }
    }
    if (category) {
        query = {
            ...query,
            $or: [
                { category }
            ]
        }
    }
    if (location) {
        query = {
            ...query,
            $or: [
                { location }
            ]
        }
    }
    try {
        const blogs = await blogModel.find(query).populate('author','email').sort({ createdAt: -1 })
        res.status(200).json({ blogs })
    } catch (err) {
        next(new appError(err.message, 500))

    }
}
// post blogs
const postBlogs = async (req, res, next) => {
    const {userInfo} = req.body
    console.log(req.body)
    if(!req.file) return next(new appError('File is required',400))
    try {
        const findUser = await blogModel.findOne({ title: req?.body?.title })
        if (findUser) return next(new appError('This is posted before', 409))
        const newPost = new blogModel({ ...req?.body,author:userInfo.userId})
        await newPost.save()
        res.status(200).json({ message: 'successfully Posted', post: { ...newPost._doc } })
    } catch (err) {
        next(new appError(err.message, 500))
    }
}
const getBlogById = async (req, res, next) => {
    try {
        const blogId = req.params.id
        const blog = await blogModel.findById(blogId).populate({path:'author',select:'userName'})
        if (!blog) return next(new appError('No Blog With This Id ', 404))
            const comment = await commentModel.find({blogId:blogId}).populate({path:"user",select:'userName email'})
       
        res.status(200).json({ blog ,comment})
    } catch (err) {
        next(new appError(err.message, 500))
    }
}
const updateBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, { ...req?.body }, { new: true })
        if (!updatedBlog) return next(new appError('Error on Updating blog', 402))

        res.status(200).json({ updatedBlog, message: 'blog successfully  updated' })
    } catch (err) {
        next(new appError(err.message, 500))
    }
}
const deleteBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id
        const deletedBlog = await blogModel.findByIdAndDelete(blogId)
        if (!deletedBlog) return next(new appError('Error on deleting blog', 402))
  await commentModel.deleteMany({blogId:blogId})
        res.status(200).json({ message: 'blog successfully  deleted' })
    } catch (err) {
        next(new appError(err.message, 500))
    }
}
const findRelatedBlogs = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId);
        if (!blog) return next(new appError('No Blog With this id', 402));

        const relatedBlogRegx = new RegExp(blog.title.split(' ').join('|'), 'i');
        const relatedQuery = {
            _id: { $ne: blogId },
            title: { $regex: relatedBlogRegx }
        };

        const relatedBlogs = await blogModel.find(relatedQuery);

        res.status(200).json({ relatedBlogs });
    } catch (err) {
        next(new appError(err.message, 500));
    }
};

module.exports = {
    getBlogs,
    postBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    findRelatedBlogs
}