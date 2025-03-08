const prisma = require("../../config/database");
const AppError = require("../utilities/appError");
const { putSingleDocumentS3 } = require("../utilities/s3");
const bucketName = process.env.AWS_S3_BUCKET;

const createBookingService = async (data) => {
    try {
        const hotel = await prisma.hotel.findUnique({
            where: {id: parseInt(data?.hotel_id) }
        });

        if (!hotel) {
            throw AppError('Hotel not exists in database', 422, 'UnprocessableEntity')
        }

        const user = await prisma.user.findUnique({
            where: { email: data?.email }
        });

        if (!user) {
            throw AppError('User not exists in database', 422, 'UnprocessableEntity')
        }

        const createdBooking = await prisma.booking.create({
            data: {
                user_id: user?.id,
                hotel_id: hotel?.id,
                adult: data?.adult,
                children: data?.children,
                checkin_time: new Date(data?.checkin_time),
                checkout_time: new Date(data?.checkout_time),
            },
        });
        console.log(createdBooking,'createdBooking')
        return createdBooking;
    } catch (error) {
        console.log(error);
        throw(error)
    }
}

const fetchBookingDetailsService = async (id) => {
    try {
        if (!id) {
            throw AppError('Please provide booking id', 422, 'UnprocessableEntity')
        }

        const fetchedBookingDetails = await prisma.booking.findUnique({
            where: { id: parseInt(id) }
        })

        if(!fetchedBookingDetails) {
            throw AppError('Booking details not exists in the database', 422, 'UnprocessableEntity')
        }

        return fetchedBookingDetails;
    } catch (error) {
        throw(error)
    }
}

const updateBookingService = async (id, adultFiles, childFiles) => {
    try {
        if (!id) {
            throw AppError("Please provide booking id", 422, "UnprocessableEntity");
        }

        // Fetch existing booking details
        const fetchedBookingDetails = await prisma.booking.findUnique({
            where: { id: parseInt(id) },
        });

        if (!fetchedBookingDetails) {
            throw AppError("Booking not found", 404, "NotFound");
        }

        // Upload files to S3 and store URLs
        const uploadedAdultFiles = [];
        const uploadedChildFiles = [];

        for (const file of adultFiles) {
            const fileUrl = await putSingleDocumentS3("booking", fetchedBookingDetails.id, file, bucketName, file.mimetype);
            uploadedAdultFiles.push(fileUrl);
        }

        for (const file of childFiles) {
            const fileUrl = await putSingleDocumentS3("booking", fetchedBookingDetails.id, file, bucketName, file.mimetype);
            uploadedChildFiles.push(fileUrl);
        }

        // Update booking record with uploaded file URLs
        const updatedBooking = await prisma.booking.update({
            where: { id: parseInt(id) },
            data: { 
                documents: [...uploadedAdultFiles, ...uploadedChildFiles], // Store all images in the `img` field
            },
        });

        return updatedBooking;
    } catch (error) {
        throw error; // Rethrow error to be handled by the caller
    }
};

module.exports = {
    createBookingService,
    fetchBookingDetailsService,
    updateBookingService
}