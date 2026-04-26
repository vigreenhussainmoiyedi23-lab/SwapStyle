export default function ChatInput() {
  return (
    <div className="
      flex items-center gap-2
      p-3 border-t border-brand-800
      bg-brand-900
    ">

      <input
        placeholder="Type a message..."
        className="
          flex-1 p-2 rounded-lg
          bg-brand-800 text-brand-100
          outline-none
        "
      />

      <button className="
        px-4 py-2 rounded-lg
        bg-accent-500 text-brand-900
        font-semibold
      ">
        Send
      </button>

    </div>
  );
}