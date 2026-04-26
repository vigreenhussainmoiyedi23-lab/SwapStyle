export default function MessageBubble({ type, text }) {
  return (
    <div className={`
      flex ${type === "me" ? "justify-end" : "justify-start"}
    `}>
      <div className={`
        p-3 rounded-2xl max-w-[70%]
        ${type === "me"
          ? "bg-accent-500 text-brand-900"
          : "bg-brand-800 text-brand-100"
        }
      `}>
        {text}
      </div>
    </div>
  );
}