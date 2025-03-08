const catchAsync = require("../utilities/catchAsync");
const { success, failure } = require("../utilities/responseHandler");
const { createUserService, fetchUsersService, signInUserService } = require("./services");

exports.createUser = catchAsync(async (req, res, next) => {
    const { data } = req.body;
    const createdUser = await createUserService(data);
    res.json(success(createdUser, "User Created Successfully!"))
});

exports.signInUser = catchAsync(async (req, res, next) => {
    try {
        const { data } = req.body;
        const signedUser = await signInUserService(data);
        res.json(success(signedUser, "User Signed Successfully!"))
    } catch (error) {
        res.json(failure(error, error?.message))
    }
});

exports.fetchUsers = catchAsync(async (req, res, next) => {
    let { searchFor = '', page, limit = 10, sort, filter } = req?.query;
    const fetchedUsers = await fetchUsersService(
        searchFor, page, limit, sort, filter
    );
    res.json(success(fetchedUsers, "Users Fetched Successfully!"))
});