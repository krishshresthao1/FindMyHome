import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { sendMessageV2 } from "../../services/api";

const MessageInput = ({ selectedUser, messages, setMessages }) => {
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    const messageText = text;

    setText("");
    setSending(true);

    try {
      const response = await sendMessageV2(
        {
          receiver_id: selectedUser.user_id,
          property_id: selectedUser.property_id,
          message: messageText,
        },
        token,
      );

      setMessages((prev) => [...prev, response.data.message]);
    } catch (err) {
      console.error(err);
      setText(messageText);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="
          flex-1
          rounded-full
          border
          border-slate-300
          px-5
          py-3
          outline-none
          focus:border-blue-500
          "
        />

        <button
          disabled={sending}
          onClick={handleSend}
          className="
          rounded-full
          bg-blue-600
          p-3
          text-white
          transition
          hover:bg-blue-700
          "
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
