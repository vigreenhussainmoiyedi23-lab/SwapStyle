import { useState } from "react";
import { useChatSocket } from "../hooks/useChatSocket";

export default function ChatInput({chatId}) {
  const [message, setMessage] = useState("");
  const { createMessage } = useChatSocket();
  const submitHandler = async () => {
    try {
      await createMessage({chatId,message});
      setMessage("");
    } catch (error) {
      
    }
  };
  return (
    <div
      className="
      flex items-center gap-2
      p-3 border-t border-brand-800
      bg-brand-900
    "
    >
      <input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler();
          }
        }}
        className="
          flex-1 p-2 rounded-lg
          bg-brand-800 text-brand-100
          outline-none
        "
      />

      <button
        onClick={submitHandler}
        className="
        px-4 py-2 rounded-lg
        bg-accent-500 text-brand-900
        font-semibold
      "
      >
        Send
      </button>
    </div>
  );
}
