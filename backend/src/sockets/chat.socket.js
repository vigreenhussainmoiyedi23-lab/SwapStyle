const { createMessageFromSocket } = require("../services/chat/socket.services");

const chatSockets = (io, socket, socketUserMap) => {
    socket.on("createMessage", async ({ chatId, message }) => {
        console.log("creating message..")
        const sender = socket.userId
        const data = await createMessageFromSocket({ chatId, message, senderId: sender })
        io.to(data.chatId.toString()).emit("message", data);
        console.log(data);
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