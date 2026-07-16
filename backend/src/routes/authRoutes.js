const express = require('express');
const router = express.Router();
const {register,login,getprofile,forgotpassword } = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register',register);

router.post('/login',login);

router.get('/getprofile',authMiddleware,getprofile);

router.put('/forgotpassword',forgotpassword);



module.exports = router;