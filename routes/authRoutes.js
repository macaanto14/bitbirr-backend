const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const logger = require('../config/logger');

router.post('/register', 
    [
        check('fullName').notEmpty().withMessage('Full name is required'),
        check('email').isEmail().withMessage('Invalid email format'),
        check('phone').matches(/^\+251[0-9]{9}$/).withMessage('Invalid phone number format'),
        check('password').isLength({ min: 6 }).withMessage('Must be 6 or more characters')
    ], 
    async (req, res, next) => {
        logger.info(`Request to /api/auth/register: ${JSON.stringify(req.body)}`);
        await authController.register(req, res).then(response => {
            logger.info(`Response from /api/auth/register: ${JSON.stringify(response.data)}`);
        }).catch(next);
    });

router.post('/login', async (req, res, next) => {
    logger.info(`Request to /api/auth/login: ${JSON.stringify(req.body)}`);
    await authController.login(req, res).then(response => {
        logger.info(`Response from /api/auth/login: ${JSON.stringify(response.data)}`);
    }).catch(next);
});

router.post('/verify-otp', async (req, res, next) => {
    logger.info(`Request to /api/auth/verify-otp: ${JSON.stringify(req.body)}`);
    await authController.verifyOtp(req, res).then(response => {
        logger.info(`Response from /api/auth/verify-otp: ${JSON.stringify(response.data)}`);
    }).catch(next);
});

router.post('/reset-password', async (req, res, next) => {
    logger.info(`Request to /api/auth/reset-password: ${JSON.stringify(req.body)}`);
    await authController.resetPassword(req, res).then(response => {
        logger.info(`Response from /api/auth/reset-password: ${JSON.stringify(response.data)}`);
    }).catch(next);
});

module.exports = router;