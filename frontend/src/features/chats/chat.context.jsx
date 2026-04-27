import { useState } from "react";
import { createContext } from "react";
export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [userAllChats, setUserAllChats] = useState([]);
  const [chatsAllMessages, setChatsAllMessages] = useState([]);
  return (
    <ChatContext.Provider
      value={{
        loading,
        setLoading,
        userAllChats,
        setUserAllChats,
        chatsAllMessages,
        setChatsAllMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
