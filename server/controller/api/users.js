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
    console.log("entered create user try block");
    const userData = await User.create(req.body);

    // generate token
    const token = jwt.sign(
      { id: userData.id }, // payload
      process.env.TOKEN_SECRET, // secret
      { expiresIn: '30d' // expiration
    }); 

    console.log("token generated");

    // set token in a cookie
    res.cookie('token', token, { 
      httpOnly: true, // client side js cannot access cookie
      secure: process.env.NODE_ENV === 'production', // cookie only works in https
      maxAge: 1000 * 60 * 60 * 24 * 30 // cookie expires in 30 days
    });

    console.log("cookie set");


    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
}
);

// login a user

module.exports = router;
