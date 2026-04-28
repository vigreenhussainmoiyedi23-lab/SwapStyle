import { useContext } from "react";
import { useChatHttp } from "./useChatHttp";
import { ChatContext } from "../chat.context";
import { useEffect } from "react";
import { socketManager } from "../../../utils/socket";

export const useChatSocket = () => {
    const { addNewMessage } = useChatHttp();
    const { setUserAllChats, userAllChats ,loading } = useContext(ChatContext)
    useEffect(() => {
        const handleOnline = ({ userId }) => {
            setUserAllChats(prev =>
                prev.map(chat =>
                    chat.otherUser._id === userId
                        ? { ...chat, isOnline: true }
                        : chat
                )
            );
        };

        const handleOffline = ({ userId }) => {
            setUserAllChats(prev =>
                prev.map(chat =>
                    chat.otherUser._id === userId
                        ? { ...chat, isOnline: false }
                        : chat
                )
            );
        };
        const handleInit = (onlineUsers) => {
            const onlineSet = new Set(onlineUsers);
            setUserAllChats(prev =>
                prev.map(chat =>
                    onlineSet.has(chat.otherUser._id)
                        ? { ...chat, isOnline: true }
                        : { ...chat, isOnline: false }
                )
            );
        };

        // register listeners
        socketManager.listenMessage("user-online", handleOnline);
        socketManager.listenMessage("user-offline", handleOffline);
        socketManager.listenMessage("presence:init", handleInit);
        // cleanup
        return () => {
            socketManager.removeListener("user-online");
            socketManager.removeListener("user-offline");
            socketManager.removeListener("presence:init");
        };
    }, []);

    if (userAllChats && !loading) socketManager.emitMessage("get-presence");
    const createMessage = (payload) => {
        socketManager.emitMessage("createMessage", payload);
    };

    const joinRoom = (chatId) => {
        socketManager.emitMessage("join_room", chatId);
    };

    const leaveRoom = (chatId) => {
        socketManager.emitMessage("leave_room", chatId);
    };

    // attach ONCE (safe now)
    socketManager.listenMessage("message", (data) => {
        addNewMessage(data);
    });

    return { createMessage, joinRoom, leaveRoom };
};