import { useContext } from "react";
import { getChatAllMessages, getUserAllChats, chatAccess } from "../services/chat.api.js";
import { ChatContext } from "../chat.context.jsx";

export const useChatHttp = () => {
    const {
        loading, setLoading,
        userAllChats, setUserAllChats,
        chatsAllMessages, setChatsAllMessages
    } = useContext(ChatContext)
    const getChatAllMessagesHandler = async ({ chatId, limit, skip }) => {
        setLoading(true)
        try {
            const response = await getChatAllMessages({ chatId, limit, skip });
            setChatsAllMessages(response?.messages);
            return response;
        } catch (error) {
            console.error('Error fetching user listings:', error);
            throw error;
        } finally {
            setLoading(false)
        }
    };
    const getUserAllChatsHandler = async () => {
        setLoading(true)
        try {
            let { chats } = await getUserAllChats();
            setUserAllChats(chats);
            return chats;
        } catch (error) {
            console.error('Error fetching user listings:', error);
            throw error;
        } finally {
            setLoading(false)
        }
    };
    const chatAccessHandler = async (otherUserId) => {
        setLoading(true)
        try {
            const response = await chatAccess(otherUserId);
            return response;
        } catch (error) {
            console.error('Error fetching user listings:', error);
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {
        loading,
        userAllChats,
        chatsAllMessages,
        getChatAllMessagesHandler,
        getUserAllChatsHandler,
        chatAccessHandler
    }
}