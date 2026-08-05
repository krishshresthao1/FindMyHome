import ConversationCard from "./ConversationCard";
import { useState } from "react";

const ConversationList = ({ conversations, selectedUser, setSelectedUser }) => {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((chat) =>
    chat.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="
      flex
      flex-1
      flex-col
      overflow-hidden
      bg-white
    "
    >
      {/* Search Bar */}
      <div className="border-b p-4">
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            text-sm
            outline-none
            focus:border-blue-500
          "
        />
      </div>

      {/* Conversation List */}
      <div
        className="
        flex-1
        overflow-y-auto
      "
      >
        {filteredConversations.length > 0 ? (
          filteredConversations.map((chat) => (
            <ConversationCard
              key={chat.conversation_id}
              chat={chat}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          ))
        ) : (
          <p
            className="
            mt-10
            text-center
            text-sm
            text-slate-400
          "
          >
            No conversations found
          </p>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
