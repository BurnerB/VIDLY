const express = require('express');

const customers = require('../routes/customerEndpoints')
const genres = require('../routes/genreEndpoints');
const movies = require('../routes/moviesEndpoints');
const rentals = require('../routes/rentalEndpoints');
const users = require('../routes/userEndpoints');
const login = require('../routes/auth');
const returns = require('../routes/returnsEndpoint');

const error = require('../middleware/error');
const auth = require('../middleware/Authentication');
const helmet = require('helmet');

module.exports = function(app){
    //Middleware sets req.body property
    app.use(express.json());

    //Parses incoming requests with url encoded payloads (key=value)
    app.use(express.urlencoded({extended:true}));

    //Serve static files
    app.use(express.static('public'));

    app.use(helmet());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', login);
    app.use('/api/returns', returns);
    app.use(error);
}