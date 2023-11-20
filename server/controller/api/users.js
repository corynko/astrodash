const router = require('express').Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const verifyToken = require('../../utils/auth');
// const authenticateToken = require('../../utils/auth');

// get one user by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

// get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

// create a new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
}
);

// login a user

module.exports = router;
