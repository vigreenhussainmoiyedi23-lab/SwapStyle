import { socketManager } from "../../../utils/socket";
import { useChatHttp } from "./useChatHttp";

export const useChatSocket = () => {
    const { addNewMessage } = useChatHttp()
    const createMessage = async ({ chatId, message, files }) => {

        socketManager.emitMessage("createMessage", { chatId, message, files })
    }
    const joinRoom = async (chatId) => {
        socketManager.emitMessage("join_room", chatId)
    }
    const leaveRoom = async (chatId) => {
        socketManager.emitMessage("leave_room", chatId)
    }
    socketManager.listenMessage("message", (data) => {
        addNewMessage(data);
        console.log("new message", data)
    })
    return { createMessage, joinRoom, leaveRoom };
}