const prisma = require("../../config/database");
const AppError = require("../utilities/appError");

const createUserService = async (data) => {
    try {
        const createdUser = await prisma.user.create({
            data: data,
        });
        console.log(createdUser,'data')

        return createdUser;
    } catch (error) {
        console.log(error);
        throw(error)
    }
}

const signInUserService = async (data) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: data?.email }
        });
        
        if (!user) {
            throw AppError('User not exists in the database', 422, 'UnprocessableEntity')
        }

        if (user?.password !== data?.password) {
            throw AppError('Please fill correct password', 422, 'UnprocessableEntity')
        }

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUserService,
    signInUserService
}