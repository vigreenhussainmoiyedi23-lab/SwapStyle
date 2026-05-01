const swapModel = require("../models/swap/swap.model");
const { getUserAllListingsService, getUserAllDataService, getNotificationService } = require("../services/user/user.service");


async function GetUserListingsHandler(req, res) {
    const { userId } = req.params;
    try {
        const listings = await getUserAllListingsService(userId);
        res.status(200).json({ listings, message: "Listings fetched successfully", success: true });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching listings", success: false });
    }
}

async function GetUserDataHandler(req, res) {
    const { userId } = req.params;
    try {
        const userData = await getUserAllDataService(userId);
        delete userData.password; // Remove sensitive information
        delete userData.__v; // Remove version key added by Mongoose
        delete userData.otp; // Remove OTP if it exists

        res.status(200).json({ userData, message: "User data fetched successfully", success: true });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching user data", success: false });
    }
}
const GetNotificationsHandler = async (req, res) => {
    try {
        const { page, limit } = req.query
        const notifications = await getNotificationService(req.userId, page, limit)
        res.status(200).json({ notifications, message: "Notifications fetched successfully", success: true })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching notifications", success: false });
    }
}
const GetRecentSwapsHandler = async (req, res) => {
    const { owner } = req.params
    try {
        const recentswaps = await swapModel.find({ owner: owner, status: { $nin: ["pending"] } }).sort({ createdAt: -1 }).limit(5)
            .select("status createdAt ownerListing requesterListing owner requester")
            .populate("requesterListing", "title images estimatedValue")
            .populate("ownerListing", "title images estimatedValue")
            .populate("owner", "username profilePicture email ")
            .populate("requester", "username profilePicture email ")
            .lean();
        res.status(200).json({ recentswaps, message: "Notifications fetched successfully", success: true })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching notifications", success: false });
    }
}

module.exports = { GetRecentSwapsHandler, GetUserListingsHandler, GetUserDataHandler, GetNotificationsHandler }