const router = require('express').Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const verifyToken = require('../../utils/auth');
const authenticateToken = require('../../utils/auth');

// GET all users
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET a single user
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;