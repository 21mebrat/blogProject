const express = require('express')
const auth = require('../middlewares/auth')
const {
    postComment,
    getAllComments
} = require('../controllers/commentController')

const router = express.Router()

router.post('/post',auth, postComment)
router.get('/get',getAllComments)
// router.post('/post',postBlogs)


module.exports = router

