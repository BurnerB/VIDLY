const{Movie, validate} = require('../models/movieModel');
const {Genre} = require('../models/genreModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require("../middleware/Authentication");


//Route handler function
router.get('/',async(req, res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
})

router.get('/:id',async (req,res)=>{
    const movies = await Movie.findById(req.params.id);

    if(!movies) return res.status(404).send("The Genre with the ID was not found.")
    res.send(movies);
})

router.post('/:id', auth,async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    const movie = new Movie({
        title: req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
    
});

router.put('/:id', auth,async(req, res)=>{
    const{ error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movies = await Movie.findByIdAndUpdate(req.params.id,{name:req.body.name},
        {new:true}
        );

    if(!movies) return res.status(404).send("The Genre with the ID was not found.")

    res.send(movies);
});

router.delete('/:id', auth,async(req,res)=>{
    const movies = await Movie.findByIdAndRemove(req.params.id)

    if(!movies) return res.status(404).send("The Genre with the ID was not found.")

    res.send(movies.name);

});

module.exports = router;

