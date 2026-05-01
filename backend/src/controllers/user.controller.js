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

module.exports = { GetUserListingsHandler, GetUserDataHandler, GetNotificationsHandler }