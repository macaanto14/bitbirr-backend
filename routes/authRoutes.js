const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', 
    [
        check('fullName').notEmpty().withMessage('Full name is required'),
        check('email').isEmail().withMessage('Invalid email format'),
        check('phone').matches(/^\+251[0-9]{9}$/).withMessage('Invalid phone number format'),
        check('password').isLength({ min: 6 }).withMessage('Must be 6 or more characters')
    ], 
    authController.register);

router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);
router.post('/reset-password', authController.resetPassword);

module.exports = router;