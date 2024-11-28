const express = require('express')
const { registerUser,userLogin,getAllUsers,resetPassword,changePassword,userLogout,deleteUser,updateRole,updateUser} = require('../controllers/userController')
const auth = require('../middlewares/auth')
const rolesAuth = require('../middlewares/rolesAuth')
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',userLogin)
router.delete('/delete/:id',auth,deleteUser)
router.patch('/update/:id',auth,updateRole)
router.patch('/updateUser/:id',auth,updateUser)
router.get('/getAll',auth,rolesAuth(200),getAllUsers)
router.get('/logout',userLogout)
router.post('/change', changePassword)
router.post('/reset-password', resetPassword)



module.exports = router