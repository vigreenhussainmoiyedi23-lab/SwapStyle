const { Router } = require("express")
const { getChatHandler, chatAccessHandler } = require("../controllers/chat.controller")
const { isAuthenticated } = require("../middlewares/protectedRoutes.middleware")
const router = Router()

router.get("/", isAuthenticated, getChatHandler)
router.post("/", isAuthenticated, chatAccessHandler)

module.exports = router