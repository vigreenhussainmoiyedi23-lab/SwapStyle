const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRouter = require("./routes/auth.routes")
const listingRouter = require("./routes/listing.routes")
const swapRouter = require("./routes/swap.routes")
const userRouter = require("./routes/user.routes")
const chatRouter = require("./routes/chat.routes")
app.use(express.json())
app.use(express.static("./public"))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRouter)
app.use("/api/listings", listingRouter)
app.use("/api/swaps", swapRouter)
app.use("/api/user", userRouter)
app.use("/api/chat", chatRouter)

module.exports = app