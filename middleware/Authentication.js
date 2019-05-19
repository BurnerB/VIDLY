const jwt = require('jsonwebtoken');
const config = require('config');

//Either terminate request response life-cycle or pass control to the next middleware function

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied.No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
    
}

module.exports= auth;