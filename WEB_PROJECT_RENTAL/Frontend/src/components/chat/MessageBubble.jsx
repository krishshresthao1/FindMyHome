import PropertyMessageCard from "./PropertyMessageCard";

const MessageBubble = ({ message, isMine }) => {
  const isPropertyMessage = message.type === "property";

  const formatTime = (time) => {
    if (!time) return "";

    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`
    mb-3
    flex
    animate-message
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
              ${
                isMine
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-white text-slate-800"
              }
            `
        }
      >
        {isPropertyMessage ? (
          <PropertyMessageCard property={message.property} />
        ) : (
          <>
            <p className="pr-10">{message.message}</p>

            {/* Time + Seen */}
            <div
              className={`
                mt-1
                flex
                justify-end
                items-center
                gap-1
                text-[11px]
                ${isMine ? "text-blue-100" : "text-slate-400"}
              `}
            >
              <span>{formatTime(message.created_at)}</span>

              {isMine && <span>{message.seen ? "✓✓" : "✓"}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
