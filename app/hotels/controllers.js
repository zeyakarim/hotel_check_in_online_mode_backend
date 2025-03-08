const catchAsync = require("../utilities/catchAsync");
const { success } = require("../utilities/responseHandler");
const { createHotelService, fetchHotelsService, fetchHotelDetailsService } = require("./services");

exports.createHotel = catchAsync(async (req, res, next) => {
    const { data } = req.body;
    const createdHotels = await createHotelService(data);
    res.json(success(createdHotels, "Hotel Created Successfully!"))
});

exports.fetchHotelDetails = catchAsync(async (req, res, next) => {
    const { id } = req?.params;
    const fetchedHotelDetails = await fetchHotelDetailsService(id);
    res.json(success(fetchedHotelDetails, 'Hotel Details Fetched Successfully'))
})

exports.fetchHotels = catchAsync(async (req, res, next) => {
    let { searchFor = '', page, limit = 10, sort, filter } = req?.query;
    const fetchedHotels = await fetchHotelsService(
        searchFor, page, limit, sort, filter
    );
    res.json(success(fetchedHotels, "Hotels Fetched Successfully!"))
});