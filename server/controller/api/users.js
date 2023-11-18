const router = require('express').Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const verifyToken = require('../../utils/auth');
// const authenticateToken = require('../../utils/auth');

router.post('/signup', async (req, res) => {
  try {
    console.log("Enetered try block");
    console.log(req.body);

    // Create a new user
    const userData = await User.create(
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
      }
    );
    
    // Create a token for the new user
    const token = jwt.sign({ userId: userData.id }, secretKey, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true });

    //respond with the token and the userData. 
    res.status(201).json({ userData, token });
  } catch(err) {
    res.status(400).json(err); 
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ where: { email: email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If authentication is successful, create a token and store it in a cookie
    const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    // set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: false });

    // Respond with user data or a success message
    res.status(200).json(userData);
  } catch (err) {
    console.error('Error during login', err);
    res.status(500).json(err);
  }
});

module.exports = router;
