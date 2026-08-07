import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { getMessagesV2, markMessagesSeenV2 } from "../../services/api";

const ChatWindow = ({ selectedUser, onMessageSent }) => {
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  const loadMessages = async () => {
    if (!selectedUser?.conversation_id) return;

    try {
      const response = await getMessagesV2(selectedUser.conversation_id, token);

      setMessages(response.data);

      await markMessagesSeenV2(selectedUser.conversation_id, token);
      if (onMessageSent) {
        await onMessageSent();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="text-center">
          <MessageCircle size={70} className="mx-auto mb-4 text-slate-300" />

          <h2 className="text-2xl font-semibold text-slate-700">
            Select a conversation
          </h2>

          <p className="mt-2 text-slate-500">
            Choose a conversation from the left.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <ChatHeader selectedUser={selectedUser} />

      <MessageList messages={messages} />

      <MessageInput
        selectedUser={selectedUser}
        messages={messages}
        setMessages={setMessages}
        onMessageSent={onMessageSent}
      />
    </div>
  );
};

export default ChatWindow;
