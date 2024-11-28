const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discripation: { type: String },
    content: { type: Object, required: true },
    coverImage: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'blogUser' },
    category: { type: String },
    ratting: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }


})


const blogModel = mongoose.models.Blogdatas || mongoose.model('blogdata', blogSchema)
module.exports = blogModel