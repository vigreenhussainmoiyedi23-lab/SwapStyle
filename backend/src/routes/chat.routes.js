const { Router } = require("express")
const { getChatAllMessagesHandler, chatAccessHandler, getUserAllChatsHandler } = require("../controllers/chat.controller")
const { isAuthenticated } = require("../middlewares/protectedRoutes.middleware")
const router = Router()

router.get("/", isAuthenticated, getUserAllChatsHandler)
router.get("/:chatId", isAuthenticated, getChatAllMessagesHandler)
router.post("/", isAuthenticated, chatAccessHandler)

module.exports = router