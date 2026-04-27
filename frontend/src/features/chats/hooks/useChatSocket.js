import { socketManager } from "../../../utils/socket";
import { useChatHttp } from "./useChatHttp";

export const useChatSocket = () => {
    const { addNewMessage} = useChatHttp()
    const createMessage = async ({ chatId, message }) => {
        //  --> {chatId, senderId, images}
        socketManager.emitMessage("createMessage", { chatId, message })
    }
    const joinRoom = async (chatId) => {
        socketManager.emitMessage("join_room", chatId)
    }
    const leaveRoom = async (chatId) => {
        socketManager.emitMessage("leave_room", chatId)
    }
    socketManager.listenMessage("message", (data) => {
        addNewMessage(data);
    })
    return { createMessage, joinRoom, leaveRoom };
}