export default function MessageBubble({ from, text, images }) {
  return (
    <div
      className={`
      
      flex  ${from === "me" ? "justify-end" : "justify-start"}
    `}
    >
      {text && images.length === 0 && (
        <div
          className={`
        p-3 rounded-2xl max-w-[70%]
        ${
          from === "me"
            ? "bg-accent-500 text-brand-900"
            : "bg-brand-800 text-brand-100"
        }
      `}
        >
          {text}
        </div>
      )}
      {images.length > 0 && !text && (
        <div
          className={` flex flex-wrap rounded-lg gap-2 border border-white/30 ${from === "me" ? "justify-end bg-accent-500" : "justify-start bg-brand-800 "}`}
        >
          {images.map((img) => (
            <img
              src={img.url}
              alt="image"
              className="w-30 lg:w-60   rounded-lg"
            />
          ))}
        </div>
      )}
      {images.length > 0 && text && (
        <div
          className={`flex flex-col ${from === "me" ? "items-end" : "items-start"}`}
        >
          <div
            className={` flex flex-wrap rounded-lg gap-2 border border-white/30 ${from === "me" ? "justify-end bg-accent-500" : "justify-start bg-brand-800 "}`}
          >
            {images.map((img) => (
              <img
                src={img.url}
                alt="image"
                className="w-30 lg:w-60   rounded-lg"
              />
            ))}
          </div>
          <div
            className={`
        p-3 rounded-2xl max-w-[70%] w-fit
        ${
          from === "me"
            ? "bg-accent-500 text-brand-900"
            : "bg-brand-800 text-brand-100"
        }
      `}
          >
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
