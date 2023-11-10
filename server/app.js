const createError = require('http-errors');
// const session = require('express-session');
const express = require('express');
const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
// const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 9000;

// const sess = {
//   secret: "Super secret secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };
// app.use(session(sess));

// Middleware setup
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(require("./controller")); // Ensure the path to your controller is correct
app.use(express.static(path.join(__dirname, 'public')));


// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

sequelize.sync({ force: false })
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost: ${PORT}`);
  });
});
