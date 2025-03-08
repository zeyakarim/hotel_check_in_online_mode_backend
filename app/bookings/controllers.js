const catchAsync = require("../utilities/catchAsync");
const { success } = require("../utilities/responseHandler");
const { createBookingService, fetchBookingDetailsService, updateBookingService } = require("./services");


exports.createBooking = catchAsync(async (req, res, next) => {
    const { data } = req.body;
    const createdBooking = await createBookingService(data);
    res.json(success(createdBooking, "Booking Created Successfully!"))
});

exports.fetchBookingDetails = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const fetchedBookingDetails = await fetchBookingDetailsService(id);
    res.json(success(fetchedBookingDetails, "Booking Details Fetched Successfully!"))
});

exports.updateBooking = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const adultFiles = req.files["adharCardAdult"] || [];
    const childFiles = req.files["adharCardChild"] || [];

    const fetchedBookingUpdate = await updateBookingService(id, adultFiles, childFiles);
    res.json(success(fetchedBookingUpdate, "Booking Update Successfully!"))
});