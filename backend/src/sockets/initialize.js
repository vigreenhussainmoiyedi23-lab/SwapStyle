const { Server } = require("socket.io");
const { getDataFromToken } = require("../utils/jsonwebtoken");
const redis = require("../config/cache");
const cookie = require("cookie");
const { chatSockets } = require("./chat.socket");
const initSocket = (server) => {
    const frontendUrl = process.env.FRONTEND_URL
    const io = new Server(server, {
        cors: {
            origin: frontendUrl || "http://localhost:5173", // later restrict to your frontend URL
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    const socketUserMap = new Map()
    io.use((socket, next) => {
        try {
            const parsedCookie = cookie.parse(socket.handshake.headers.cookie)
            const token = (parsedCookie.token)
            if (!token) {
                return next(new Error("Unauthorized"));
            }
            const { id } = getDataFromToken(token)
            const istokenBlackListed = redis.get(token)
            if (istokenBlackListed) {
                socket.emit("error", "Forbidden: Token is blacklisted")
            }
            socket.userId = id
            next();
        } catch (error) {
            socket.emit("error", error.message)
            next()
        }
    });
    io.on("connection", (socket) => {

        socketUserMap.set(socket.userId, [...(socketUserMap.get(socket.userId) || []), socket.id])
        console.log(socketUserMap.get(socket.userId))


        chatSockets(io, socket, socketUserMap);



        socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id);
            socketUserMap.set(socket.userId, socketUserMap.get(socket.userId).filter(id => id !== socket.id))
        });
    });

    return io;
};
module.exports = { initSocket };