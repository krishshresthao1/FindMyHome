import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
      {messages?.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isMine={
            msg.sender_id === currentUser?._id ||
            msg.sender_id === currentUser?.id
          }
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
