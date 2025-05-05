const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser({ fullName, email, phone, password: hashedPassword }, (err) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(201).json({ message: 'User registered successfully' });

        // Send email confirmation logic goes here...
    });
};

// Implement other controller methods such as login, verify-otp, reset-password.