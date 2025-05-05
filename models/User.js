const db = require('../config/db');

const User = {
    createUser: (user, callback) => {
        db.query('INSERT INTO users SET ?', user, callback);
    },

    findUserByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },
    
    findUserByPhone: (phone, callback) => {
        db.query('SELECT * FROM users WHERE phone = ?', [phone], callback);
    },
    
    // additional methods as needed
};

module.exports = User;