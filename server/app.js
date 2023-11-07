#!/usr/bin/env node

const createError = require('http-errors');
const session = require('express-session');
const express = require('express');
const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const debug = require('debug')('server:server');
const http = require('http');

const app = express();

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup (via controller file)
app.use(require("./controller")); // Ensure the path to your controller is correct

// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

const server = http.createServer(app);

sequelize.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`Server listening on: http://localhost: ${port}`);
  });
});
// handles errors that might occur while attempting to start the server
server.on('error', error => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
});