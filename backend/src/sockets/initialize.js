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
    // userId -> socketId
    io.use(async (socket, next) => {
        try {
            const parsedCookie = cookie.parse(socket.handshake.headers.cookie)
            const token = (parsedCookie.token)
            if (!token) {
                return next(new Error("Unauthorized"));
            }
            const { id } = getDataFromToken(token)
            const istokenBlackListed = await redis.get(token)
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

        const userId = socket.userId
        if (!socketUserMap.has(userId)) {
            socketUserMap.set(userId, new Set());
        }

        socketUserMap.get(userId).add(socket.id);
        socket.on("get-presence", () => {
            console.log("givingpresence")
            const payload = Array.from(socketUserMap.keys());

            socket.emit("presence:init", payload);
        })
        io.emit("user-online", {
            userId,
        });



        chatSockets(io, socket, socketUserMap);
        socket.on("disconnect", () => {
            const userSockets = socketUserMap.get(socket.userId);
            // 🔴 USER OFFLINE EVENT
            if (userSockets) {
                userSockets.delete(socket.id);

                // cleanup empty users
                if (userSockets.size === 0) {
                    socketUserMap.delete(socket.userId);
                }
            }
            io.emit("user-offline", {
                userId,
            });

        });
    });

    return io;
};
module.exports = { initSocket };