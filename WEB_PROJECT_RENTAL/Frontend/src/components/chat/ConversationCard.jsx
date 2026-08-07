import { User } from "lucide-react";

const ConversationCard = ({ chat, selectedUser, setSelectedUser }) => {
console.log("Raw:", chat.time);

const date = new Date(chat.time + "Z");

console.log("Parsed:", date);
console.log("Local:", date.toLocaleString());
console.log("Now:", new Date().toLocaleString());

  const currentUser = JSON.parse(localStorage.getItem("user"));

const currentUserId = currentUser?._id || currentUser?.id;

let preview = chat.last_message;

if (chat.last_sender === currentUserId) {
  preview = chat.last_seen ? "Seen" : "Sent";
}



    const formatConversationTime = (time) => {
      if (!time) return "";

      const date = new Date(time + "Z");
      const now = new Date();

      const diff = Math.floor((now - date) / 1000);

      let result;

      if (diff < 60) {
        result = "now";
      } else if (diff < 3600) {
        result = `${Math.floor(diff / 60)}m`;
      } else if (diff < 86400) {
        result = `${Math.floor(diff / 3600)}h`;
      } else {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);

        if (date.toDateString() === yesterday.toDateString()) {
          result = "Yesterday";
        } else {
          result = date.toLocaleDateString([], {
            day: "numeric",
            month: "short",
          });
        }
      }

      console.log("Returned:", result);

      return result;
    };

  return (
    <div
      onClick={() => setSelectedUser(chat)}
      className={`cursor-pointer border-b border-slate-100 p-5 transition hover:bg-slate-50 ${
        selectedUser?.conversation_id === chat.conversation_id
          ? "bg-slate-100"
          : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <User className="text-blue-600" />
        </div>

        {/* User Info */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h3
                className={`truncate ${
                  !chat.last_seen && chat.last_sender !== currentUserId
                    ? "font-bold text-slate-900"
                    : "font-semibold text-slate-900"
                }`}
              >
                {chat.name}
              </h3>

              <p className="truncate text-xs font-medium text-blue-600">
                {chat.property_title}
              </p>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <p
              className={`flex-1 truncate text-sm ${
                !chat.last_seen && chat.last_sender !== currentUserId
                  ? "font-semibold text-slate-900"
                  : preview === "Seen"
                    ? "font-medium text-slate-900"
                    : "text-slate-500"
              }`}
            >
              {preview}
            </p>

            <div className="flex shrink-0 items-center gap-1">
              {!chat.last_seen && chat.last_sender !== currentUserId && (
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              )}

              <span className="text-xs text-slate-400">
                {formatConversationTime(chat.time)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
