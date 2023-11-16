const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
};

module.exports = verifyToken;