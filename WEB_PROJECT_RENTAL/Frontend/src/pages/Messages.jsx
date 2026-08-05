import { useEffect, useState } from "react";
import { MessageCircle, User } from "lucide-react";
import { getConversationsV2 } from "../services/api";
import ChatBox from "../components/chat/ChatBox";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import { useLocation } from "react-router-dom";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await getConversationsV2(token);

      console.log("CONVERSATIONS:", response.data);

      const chats = response.data || [];

      setConversations(chats);

      // Auto open conversation from property page
      if (location.state?.conversationId) {
        const chat = chats.find(
          (item) => item.conversation_id === location.state.conversationId,
        );

        if (chat) {
          setSelectedUser({
            ...chat,
            isNew: location.state?.isNew,
            propertyId: location.state?.propertyId,
            propertyTitle: location.state?.propertyTitle,
          });
        }
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading messages...</p>
      </div>
    );
  }

        console.log("SELECTED USER:", selectedUser);
  return (
    <div
      className="
      fixed
      top-[72px]
      bottom-0
      left-0
      right-0
      flex
      bg-white
    "
    >
      {/* LEFT SIDE */}
      <div
        className="
        flex
        w-[350px]
        flex-col
        border-r
        border-slate-200
      "
      >
        {/* LEFT HEADER */}
        <div className="h-[88px] border-b px-6 py-5">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <MessageCircle size={24} />
            Messages
          </h1>

          <p className="text-sm text-slate-500">
            Chat with tenants and owners.
          </p>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={conversations}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}

      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};



export default Messages;
