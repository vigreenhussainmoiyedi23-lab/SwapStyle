const { Server } = require("socket.io");
const { getDataFromToken } = require("../utils/jsonwebtoken");
const redis = require("../config/cache");

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // later restrict to your frontend URL
            methods: ["GET", "POST"],
        },
    });
    const socketUserMap = new Map()
    io.use((socket, next) => {
        try {
            const token = (socket.handshake.headers.cookie)
            if (!token) {
                console.log("disconnecting socket...")
                socket.disconnect()
                
            }
            const { id } = getDataFromToken(token)
            const istokenBlackListed = redis.get(token)
            if (istokenBlackListed) {
                socket.emit("error", "Forbidden: Token is blacklisted")
            }
            socket.userId = id
            next();
        } catch (error) {
            console.log(error, "aa gaya")
            socket.emit("error", error.message)
            next()
        }
    });
    io.on("connection", (socket) => {
        console.log("🔌 User connected:", socket.id, socket.userId);


        // join chat room
        socket.on("join_room", (chatId) => {
            socket.join(chatId.toString());
            console.log(`User joined room: ${chatId}`);
        });

        // send message
        socket.on("send_message", (data) => {
            // data = { chatId, message, senderId }

            io.to(data.chatId).emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id);
        });
    });

    return io;
};
module.exports = { initSocket };