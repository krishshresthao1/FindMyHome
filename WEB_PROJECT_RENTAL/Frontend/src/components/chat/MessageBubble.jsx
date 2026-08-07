import PropertyMessageCard from "./PropertyMessageCard";

const MessageBubble = ({ message, isMine, selected, onClick }) => {
  const isPropertyMessage = message.type === "property";

  const formatTime = (time) => {
    if (!time) return "";

    const date = new Date(time + "Z");
    const now = new Date();

    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "now";

    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m ago`;
    }

    if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h ago`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div
      onClick={onClick}
      className={`
    mb-3
    flex
    w-full
    animate-message
    cursor-pointer
    ${isMine ? "justify-end" : "justify-start"}
  `}
    >
      <div
        className={
          isPropertyMessage
            ? ""
            : `
        max-w-[70%]
        rounded-2xl
        px-4
        py-2
        shadow-sm
        relative
        break-words
        ${
          isMine
            ? "rounded-br-none bg-blue-600 text-white"
            : "rounded-bl-none bg-slate-100 text-slate-800"
        }
      `
        }
      >
        {isPropertyMessage ? (
          <PropertyMessageCard property={message.property} />
        ) : (
          <>
            {message.message}

            {selected && (
              <div
                className={`
          mt-1
          flex
          justify-end
          gap-1
          text-[11px]
          ${isMine ? "text-blue-100" : "text-slate-400"}
        `}
              >
                <span>{formatTime(message.created_at)}</span>

                {isMine && <span>{message.seen ? "Seen" : "Sent"}</span>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
