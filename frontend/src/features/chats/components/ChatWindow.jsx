import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatWindow({chatId}) {
  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="
        p-4 border-b border-brand-800
        playfair text-brand-100
      ">
        Sarah Chen
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        <MessageBubble type="other" text="Hi! I love your jacket." />
        <MessageBubble type="me" text="Thanks! It's still available." />
      </div>

      {/* Input */}
      <ChatInput />

    </div>
  );
}