import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [selectedMessage, setSelectedMessage] = useState(null);
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col items-start overflow-y-auto p-4">
      {messages?.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isMine={
            msg.sender_id === currentUser?._id ||
            msg.sender_id === currentUser?.id
          }
          selected={selectedMessage === msg._id}
          onClick={() =>
            setSelectedMessage(selectedMessage === msg._id ? null : msg._id)
          }
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
