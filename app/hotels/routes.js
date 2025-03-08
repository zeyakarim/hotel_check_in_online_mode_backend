const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.post('/create', controller.createHotel);

router.get('/:id', controller.fetchHotelDetails);

router.get('/', controller.fetchHotels);

module.exports = router