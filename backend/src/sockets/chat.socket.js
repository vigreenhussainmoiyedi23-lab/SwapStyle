const { createMessageFromSocket } = require("../services/chat/socket.services");

const chatSockets = (io, socket, socketUserMap) => {
    socket.on("createMessage", async (data) => {
        try {
            const senderId = socket.userId; // from auth middleware
            const newMessage = await createMessageFromSocket({
                ...data,
                senderId,
            });
            console.log(newMessage);
            io.to(data.chatId).emit("message", newMessage);

        } catch (err) {
            console.log(err);
        }
    });

    socket.on("join_room", (chatId) => {
        socket.join(chatId.toString());
        console.log(`User joined room: ${chatId}`);
    });
    socket.on("leave_room", (chatId) => {
        socket.join(chatId.toString());
        console.log(`User joined room: ${chatId}`);
    });
}

module.exports = { chatSockets }