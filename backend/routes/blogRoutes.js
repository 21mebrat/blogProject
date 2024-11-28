const express = require('express')
const auth = require('../middlewares/auth')
const roleAuth = require('../middlewares/rolesAuth')
const {
    getBlogs,
    postBlogs,
    getBlogById,
    updateBlog, 
    deleteBlog,
    findRelatedBlogs,
} = require('../controllers/blogController')
const uploads = require('../middlewares/multerConfig')
const multer = require('multer')
const router = express.Router()

router.get('/get', getBlogs)
router.get('/get/:id', getBlogById)
router.post('/post',uploads.single('coverImage'),  auth, postBlogs);
router.get('/relatedBlogs/:id', findRelatedBlogs)
router.patch('/update/:id', auth, updateBlog)
router.delete('/delete/:id', auth, deleteBlog)
module.exports = router

