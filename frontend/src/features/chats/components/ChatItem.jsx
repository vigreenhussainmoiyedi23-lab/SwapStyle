export default function ChatItem({ chat, current }) {
  return (
    <div
      style={
        chat._id.toString() === current
          ? {
              backgroundColor: "var(--color-accent-500)",
              color: "var(--color-brand-900)",
            }
          : {}
      }
      className="
      flex items-center gap-3
      p-3 rounded-xl
      bg-brand-800/40
      hover:bg-brand-700/40
      transition cursor-pointer
    "
      onClick={() => {
        window.location.href = `/chats/${chat._id}`;
      }}
    >
      <img
        src={chat.otherUser.profilePicture}
        className="w-10 h-10 rounded-full bg-brand-700"
      />

      <div className="flex-1">
        <p className="montserrat font-medium ">
          {chat.otherUser.username}
        </p>
        <p className="text-sm text-brand-300 truncate">{chat.lastMessage}</p>
      </div>
    </div>
  );
}
