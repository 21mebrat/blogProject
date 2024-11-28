const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "blogUser", required: true },
    blogId: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Ensure no unique index on the user field
const commentModel = mongoose.models.Comments || mongoose.model('comment', commentSchema);
module.exports = commentModel;
