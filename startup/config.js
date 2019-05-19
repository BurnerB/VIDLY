const config = require('config');

module.exports = function(){
    //exit process instead of error
    if(!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined');
        process.exit(1);
    }
}