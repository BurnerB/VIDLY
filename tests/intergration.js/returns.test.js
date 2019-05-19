const {Rental} = require('../../models/rentalModel');
const { User } = require('../../models/userModel');
const { Movie } = require('../../models/movieModel');
const moment = require('moment');
const mongoose = require('mongoose');
const request = require('supertest');


describe('/api/returns', ()=>{
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    const exec = ()=>{
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId,movieId});
    }


    beforeEach(async()=>{ 
        server = require('../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        movie = new Movie({
            _id:movieId,
            title:'12345',
            dailyRentalRate:2,
            genre:{ name: '12345'},
            numberInStock:10
        });
        await movie.save();


        rental = new Rental({
            customer:{
                _id: customerId,
                name:'12345',
                phone:'12345'
            },
            movie:{
                _id :movieId,
                title:'123456',
                dailyRentalRate:2

            }
        });
        await rental.save();
    })

    afterEach( async()=>{ 
        await server.close();
        await Rental.remove({});
        await Movie.remove({});
    });

    it('should return 401 if client not logged in', async()=>{
        token = "";
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if customer ID not provided', async()=>{
        customerId = '';

        const res = await exec();
        
        expect(res.status).toBe(400);
    });

    it('should return 400 if movie ID not provided', async()=>{
        movieId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for customer/movie', async()=>{
        await Rental.remove({});

        const res = await exec();

        expect(res.status).toBe(404);
    });

    it('should return 400 if return is already processed', async()=>{
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if we have a valid request', async()=>{
        const res = await exec();

        expect(res.status).toBe(200);
    });

    it('should set the return Date if input is valid', async()=>{
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        const diff = new Date() - rentalInDb.dateReturned;
        expect(diff).toBeLessThan(10* 1000);
    });

    it('should set the rentalFee if input is valid', async()=>{
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        expect(rentalInDb.rentalFee).toBe(14);
    });

    it('should increase the movie stock if input is valid', async()=>{
        const res = await exec();

        const movieInDb = await Movie.findById(movieId);

        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should return rental  if input is valid', async()=>{
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        // expect(res.body).toHaveProperty('dateOut');
        // expect(res.body).toHaveProperty('dateReturned');
        // expect(res.body).toHaveProperty('rentalFee');
        // expect(res.body).toHaveProperty('customer');
        // expect(res.body).toHaveProperty('movie');

        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut', 'dateReturned',
            'rentalFee','customer','movie']));
    });


});