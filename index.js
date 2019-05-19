const debug = require('debug')('app:startup');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

// console.log('Mail Password: '+ config.get('mail.password'));
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

//event emitter

if (app.get('env')=== 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

//Custom middleware
// app.use(logger);
// app.use(auth);

const port = process.env.PORT
const server = app.listen(port, ()=> winston.info(`Listening on port ${port}...`));

module.exports = server;