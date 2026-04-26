import ChatItem from "./ChatItem";

const dummyChats = [
  { id: 1, name: "Sarah Chen", lastMessage: "Can you send more photos?" },
  { id: 2, name: "Emma Wilson", lastMessage: "Let’s ship tomorrow" },
  { id: 3, name: "Olivia Park", lastMessage: "Size S, very comfy" },
];

export default function ChatList() {
  return (
    <div className="p-3">

      <h2 className="playfair text-2xl mb-4 text-brand-100">
        Messages
      </h2>

      <div className="space-y-2">
        {dummyChats.map(chat => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>

    </div>
  );
}