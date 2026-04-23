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

module.exports = { findUserByEmail, findUserById, findUserByIdAndUpdate, createUser };