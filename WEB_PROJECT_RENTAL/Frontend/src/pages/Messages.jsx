import { useEffect, useState } from "react";
import { MessageCircle, User } from "lucide-react";
import { getConversations } from "../services/api";
import ChatBox from "../components/chat/ChatBox";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await getConversations(token);

      console.log("CONVERSATIONS:", response.data);

      setConversations(response.data || []);
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
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3">
          <MessageCircle className="text-blue-600" size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>

          <p className="text-slate-500">
            Chat with tenants interested in your properties.
          </p>
        </div>
      </div>

      {conversations.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <MessageCircle size={45} className="mx-auto mb-4 text-slate-400" />

          <h2 className="text-xl font-semibold text-slate-800">
            No messages yet
          </h2>

          <p className="mt-2 text-slate-500">
            Tenant conversations will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <MessageCircle
                size={45}
                className="mx-auto mb-4 text-slate-400"
              />

              <h2 className="text-xl text-slate-800">No messages yet</h2>

              <p className="mt-2 text-slate-500">
                Tenant conversations will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((chat) => (
                <div
                  key={chat.user_id}
                  onClick={() => {
                    console.log("Selected chat:", chat);
                    setSelectedUser(chat);
                  }}
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <User className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {chat.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {chat.last_message}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    {new Date(chat.time).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {selectedUser && (
        <ChatBox
          receiverId={selectedUser.user_id}
          receiverName={selectedUser.name}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};



export default Messages;
