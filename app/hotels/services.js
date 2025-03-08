const prisma = require("../../config/database");
const AppError = require("../utilities/appError");

const createHotelService = async (data) => {
    try {
        const createdHotel = await prisma.hotel.create({
            data: data,
        });

        return createdHotel;
    } catch (error) {
        console.log(error);
        throw(error)
    }
}

const fetchHotelDetailsService = async (id) => {
    try {
        if (!id) {
            throw AppError('Please provide hotel id', 422, 'UnprocessableEntity')
        }

        const fetchedHotelDetails = await prisma.hotel.findUnique({
            where: { id: parseInt(id) }
        })

        if(!fetchedHotelDetails) {
            throw AppError('Hotel not exists in the database', 422, 'UnprocessableEntity')
        }

        return fetchedHotelDetails;
    } catch (error) {
        throw(error)
    }
}

const fetchHotelsService = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.hotel.findMany({
                // where: searchConditions,
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.hotel.count({
                // where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            hotels: data, 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log(error);
        throw(error)
    }
}

module.exports = {
    createHotelService,
    fetchHotelDetailsService,
    fetchHotelsService
}