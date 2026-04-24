const listingModel = require("../../models/listing.model");
const userModel = require("../../models/user/user.model");

async function findUserByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
}
async function findUserById(id) {
    return await userModel.findById(id);
}
async function findUserByIdAndUpdate(id, updateData) {
    return await userModel.findByIdAndUpdate(id, updateData, { new: true });
}
async function createUser(userData) {
    return await userModel.create(userData);
}
/*
 * @param {string} userId - the id of the user whose listings are being fetched
 * @returns {object[]} - an array of listings owned by the user
 * @description Fetches all listings owned by a specific user from the database
 */
async function getUserAllListingsService(userId) {
    try {
        const listings = await listingModel.find({ owner: userId });
        return listings;
    } catch (error) {
        console.log("Error fetching user listings:", error);
        throw error;
    }
}
async function getUserAllDataService(userId) {
    try {
        const user = await userModel.findById(userId).lean();
        return user;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
}

module.exports = { findUserByEmail, findUserById, findUserByIdAndUpdate, createUser, getUserAllListingsService, getUserAllDataService };