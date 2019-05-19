const {Rental} = require('../models/rentalModel');
const {Movie} = require('../models/movieModel');
const validate = require('../middleware/validate');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const auth = require('../middleware/Authentication');
const express = require('express');
const moment = require('moment');
const router = express.Router();



router.post('/', [auth, validate(validateReturn)],async(req, res,)=>{
    
    const rental = await Rental.findOne({
        'customer._id':req.body.customerId,
        'movie._id':req.body.movieId,
    });

    if(!rental) return res.status(404).send('Rental not found');

    if (rental.dateReturned) return res.status(400).send('Rental already processed');

    rental.dateReturned = new Date();
    
    const rentalDays = moment().diff(rental.dateOut,'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    await rental.save();


    await Movie.update({_id:rental.movie._id},{
        $inc: {numberInStock:1}
    });
    
    return res.status(200).send(rental);
});

function validateReturn(req){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId:Joi.objectId().required()
    };
    return Joi.validate(req, schema)
    }


module.exports = router;