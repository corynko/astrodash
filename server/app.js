// const createError = require('http-errors');
const express = require('express');
const sequelize = require('./config/connection');
const authenticateToken = require('./utils/auth');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 9000;


// Middleware setup
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(require("./controller"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(['/api/profile'], authenticateToken);


// Error handling
// app.use((req, res, next) => {
//   next(createError(404));
// });

sequelize.sync({ force: false })
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost: ${PORT}`);
  });
});
