import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

export default function ChatLayout({ chatId, chats ,chatAllMessages}) {
  const chat = chats.find((chat) => chat._id.toString() === chatId);
  return (
    <div className="flex h-[90vh] bg-brand-900 text-white mt-[10vh]">
      {/* Inbox */}
      <div
        className="
        w-full md:w-1/3
        border-r border-brand-800
        bg-brand-900
      "
      >
        <ChatList chatId={chatId} chats={chats} />
      </div>

      {/* Chat Window */}
      <div
        className="
        hidden md:flex md:flex-1
        flex-col
      "
      >
        {!chatId && (
          <div className="hidden md:flex flex-1 items-center justify-center text-brand-400">
            Select a chat to start messaging
          </div>
        )}
        {chatId && <ChatWindow chat={chat} chatAllMessages={chatAllMessages}/>}
      </div>
    </div>
  );
}
