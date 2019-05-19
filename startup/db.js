const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    const db = config.get('db');
    mongoose.connect(config.get('db'))
    .then(()=> console.log(`Connected to ${db}...`))
    .catch(err => console.error(`Could not connect to ${db}`))
};