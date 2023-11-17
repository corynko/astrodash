const verifyToken = require('./verifyToken');

const authenticateToken = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) {
     return res.status(401).send('Access Denied');
    }

    try {
        const verified = verifyToken(token);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = authenticateToken;