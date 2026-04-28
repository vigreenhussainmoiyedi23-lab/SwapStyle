const chatModel = require("../models/chats/chat.model");
const { createMessageFromSocket } = require("../services/chat/socket.services");

const chatSockets = (io, socket, socketUserMap) => {
    socket.on("createMessage", async (data) => {
        try {
            const senderId = socket.userId; // from auth middleware
            const newMessage = await createMessageFromSocket({
                ...data,
                senderId,
            });
            const chat = await chatModel.findById(data.chatId)
            chat.lastMessage = newMessage._id
            chat.lastMessageAt = Date.now()
            await chat.save()
            io.to(data.chatId).emit("message", newMessage);

        } catch (err) {
            console.log(err);
        }
    });

    socket.on("join_room", (chatId) => {
        socket.join(chatId.toString());
    });
    socket.on("leave_room", (chatId) => {
        socket.join(chatId.toString());
    });
}

module.exports = { chatSockets }