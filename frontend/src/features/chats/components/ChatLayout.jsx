import ChatList from "./ChatList";

export default function ChatLayout({ children }) {
  return (
    <div className="flex h-screen bg-brand-900 text-white mt-[10vh]">

      {/* Inbox */}
      <div className="
        w-full md:w-1/3
        border-r border-brand-800
        bg-brand-900
      ">
        <ChatList />
      </div>

      {/* Chat Window */}
      <div className="
        hidden md:flex md:flex-1
        flex-col
      ">
        {children}
      </div>

    </div>
  );
}