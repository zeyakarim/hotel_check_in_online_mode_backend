const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const { multerUpload } = require('../utilities/multer');

router.post('/create', controller.createBooking);

router.get('/:id', controller.fetchBookingDetails);

router.put(
    '/:id',
    multerUpload(['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg', 'pdf']).fields([
        { name: "adharCardAdult", maxCount: 10 }, // Multiple adults
        { name: "adharCardChild", maxCount: 10 }, // Multiple children
    ]),
    controller.updateBooking
)

module.exports = router