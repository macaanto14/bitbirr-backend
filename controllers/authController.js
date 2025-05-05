const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const logger = require('../config/logger');

exports.register = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser({ fullName, email, phone, password: hashedPassword }, (err) => {
        if (err) {
            logger.error(`Database error: ${err.message}`);
            return res.status(500).json({ message: 'Database error' });
        }
        logger.info(`User registered with email: ${email}`);
        res.status(201).json({ message: 'User registered successfully' });

        // Send email confirmation logic would be implemented here...
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, results) => {
        if (err) {
            logger.error(`Database error: ${err.message}`);
            return res.status(500).json({ message: 'Database error' });
        }
        if (!results.length) {
            logger.warn(`Login failed: User not found with email: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`Login failed: Invalid password for email: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`User logged in with email: ${email}`);
        res.json({ token });
    });
};

exports.verifyOtp = (req, res) => {
    // OTP verification logic here
    logger.info(`OTP verification request for email: ${req.body.email}`);
    // Simulate OTP verification
    res.json({ message: 'OTP verified successfully' });
};

exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    User.findUserByEmail(email, (err, results) => {
        if (err) {
            logger.error(`Database error: ${err.message}`);
            return res.status(500).json({ message: 'Database error' });
        }
        if (!results.length) {
            logger.warn(`Reset password failed: User not found with email: ${email}`);
            return res.status(404).json({ message: 'User not found' });
        }

        // Logic to send reset link would go here...
        logger.info(`Password reset link sent to email: ${email}`);
        res.json({ message: 'Password reset link sent' });
    });
};