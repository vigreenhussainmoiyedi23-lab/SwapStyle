const { Router } = require("express")
const { GetUserDataHandler, GetUserListingsHandler, GetNotificationsHandler, GetRecentSwapsHandler } = require("../controllers/user.controller.js")
const { isAuthenticated } = require("../middlewares/protectedRoutes.middleware.js")
const router = Router()

router.get("/data/:userId", GetUserDataHandler)
router.get("/listings/:userId", GetUserListingsHandler)
router.get("/notifications", isAuthenticated, GetNotificationsHandler)
router.get("/recentSwaps/:owner", GetRecentSwapsHandler)

module.exports = router