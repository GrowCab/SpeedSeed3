#!/usr/bin/env node
let express = require('express');
//let cors = require('cors');
//let compression = require('compression');
let bodyParser = require('body-parser');
let logger = require('morgan');
let debug = require('debug')('backend:server');

// Create new express app.
let app = express();

// Add in mongoose and connect to database.
require('./mongoose')(app);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// When database in docker container is ready for connections...
app.on('mongo_ready', function() {
  // Load in express app middleware.
  console.log('Database ready, loading middleware...');
  app.use(logger('dev'));
  //app.use(cors());
  //app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Pull in schemas
  console.log("Loading schemas...");
  require('./schemas/Errors')(app);
  require('./schemas/Settings')(app);
  require('./schemas/Status')(app);

  // Start API endpoints
  console.log("Loading API endpoints...");
  require('./routes/Settings')(app);
  require('./routes/Status')(app);

  // Start app
  var port = normalizePort(process.env.PORT || '3000');
  app.listen(process.env.PORT);
  console.log("Listening on: " + process.env.PORT)
})
