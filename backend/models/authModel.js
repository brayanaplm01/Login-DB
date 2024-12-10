const db = require('../database');
const bcrypt = require('bcrypt');

const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = ?`;
        db.get(query, [username], (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
};

const validatePassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
    getUserByUsername,
    validatePassword,
};
