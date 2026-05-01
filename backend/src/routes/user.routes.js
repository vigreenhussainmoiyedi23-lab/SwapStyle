const {Router}  =require("express")
const { GetUserDataHandler, GetUserListingsHandler, GetNotificationsHandler } = require("../controllers/user.controller.js")
const {isAuthenticated}=require("../middlewares/protectedRoutes.middleware.js")
const router = Router()

router.get("/data/:userId",GetUserDataHandler)
router.get("/listings/:userId",GetUserListingsHandler)
router.get("/notifications",isAuthenticated,GetNotificationsHandler)

module.exports = router