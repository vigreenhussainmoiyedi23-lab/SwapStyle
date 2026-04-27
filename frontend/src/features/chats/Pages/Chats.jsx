import { useParams } from "react-router-dom";
import ChatLayout from "../components/ChatLayout";
import { useChatHttp } from "../hooks/useChatHttp";
import { useEffect } from "react";

export default function Chats() {
  const {
    getUserAllChatsHandler,
    getChatAllMessagesHandler,
    userAllChats,
    chatsAllMessages,
  } = useChatHttp();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await getUserAllChatsHandler();
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      await getChatAllMessagesHandler({ chatId: id });
    }
    fetchData();
  }, [id]);
  
  return <ChatLayout chatId={id} chats={userAllChats} />;
}
