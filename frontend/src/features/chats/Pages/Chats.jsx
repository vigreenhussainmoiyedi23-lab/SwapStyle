import ChatLayout from "../components/ChatLayout";

export default function Chats() {
  return (
    <ChatLayout>
      <div className="hidden md:flex flex-1 items-center justify-center text-brand-400">
        Select a chat to start messaging
      </div>
    </ChatLayout>
  );
}