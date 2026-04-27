const messageModel = require("../../models/chats/message.model")

const createMessageFromSocket = async ({ chatId, message,senderId }) => {
    const newMessage = await messageModel.create({
        chatId: chatId,
        sender: senderId,
        text: message,
    })
    return newMessage
}

module.exports = { createMessageFromSocket }