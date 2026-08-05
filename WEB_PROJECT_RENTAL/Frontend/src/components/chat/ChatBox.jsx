import { useEffect, useState } from "react";
import { Send, X } from "lucide-react";

import {
  getMessagesV2,
  sendMessageV2,
  markMessagesSeenV2,
} from "../../services/api";

const ChatBox = ({
  conversationId,
  receiverId,
  receiverName,
  propertyId,
  onClose,
}) => {
  console.log("CHATBOX NAME:", receiverName);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const loadMessages = async () => {
    try {
      const response = await getMessagesV2(conversationId, token);

      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const openChat = async () => {
      await loadMessages();

      await markMessagesSeenV2(conversationId, token);
    };

    openChat();
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const response = await sendMessage(
        {
          receiver_id: receiverId,
          property_id: propertyId,
          message: text,
        },
        token,
      );

      setMessages([...messages, response.data]);

      setText("");
    } catch (error) {
      console.error(error);
    }
  };
  console.log("receiverName:", receiverName);
  console.log("receiverId:", receiverId);

  return (
    <div
      className="
      fixed
      bottom-6
      right-6
      z-[9999]
      flex
      h-[500px]
      w-[350px]
      flex-col
      rounded-3xl
      bg-white
      shadow-2xl
      border
    "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        rounded-t-3xl
        bg-blue-600
        px-5
        py-4
        text-white
      "
      >
        <h2 className="font-semibold">{receiverName}</h2>

        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Messages */}

      <div
        className="
        flex-1
        space-y-3
        overflow-y-auto
        p-4
      "
      >
        {messages.map((msg) => {
          console.log("CURRENT USER:", currentUser);
          console.log("MESSAGE:", msg);
          const isMine =
            msg.sender_id === currentUser?.id ||
            msg.sender_id === currentUser?._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
          max-w-[75%]
          rounded-2xl
          px-4
          py-2
          text-sm
          shadow-sm
          ${
            isMine
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-slate-100 text-slate-800 rounded-bl-none"
          }
        `}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}

      <div
        className="
        flex
        gap-2
        border-t
        p-3
      "
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="
            flex-1
            rounded-xl
            border
            px-3
            outline-none
          "
        />

        <button
          onClick={handleSend}
          className="
            rounded-xl
            bg-blue-600
            p-3
            text-white
          "
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
