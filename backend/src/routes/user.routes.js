const {Router}  =require("express")
const { GetUserDataHandler, GetUserListingsHandler } = require("../controllers/user.controller.js")

const router = Router()

router.get("/data/:userId",GetUserDataHandler)
router.get("/listings/:userId",GetUserListingsHandler)


module.exports = router