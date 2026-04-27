import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useChatHttp } from "../hooks/useChatHttp";
import  useAuth  from "../../auth/hooks/useAuth";
export default function ChatWindow({ chat }) {
  const { user } = useAuth();
  const { chatsAllMessages } = useChatHttp();
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="
        p-4 border-b border-brand-800
        playfair text-brand-100
      "
      >
        {chat?.otherUser?.username || "Username"}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chatsAllMessages &&
          chatsAllMessages.map((message) => (
            <MessageBubble
              key={message._id}
              from={
                user?._id.toString() === message.sender.toString()
                  ? "me"
                  : "other"
              }
              text={message.text}
            />
          ))}
      </div>

      {/* Input */}
      <ChatInput chatId={chat?._id} />
    </div>
  );
}
