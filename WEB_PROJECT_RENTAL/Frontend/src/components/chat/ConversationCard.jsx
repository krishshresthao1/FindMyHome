import { User } from "lucide-react";

const ConversationCard = ({ chat, selectedUser, setSelectedUser }) => {
  return (
    <div
      onClick={() => setSelectedUser(chat)}
      className={`cursor-pointer border-b border-slate-100 p-5 transition hover:bg-slate-50 ${
        selectedUser?.user_id === chat.user_id ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <User className="text-blue-600" />
        </div>

        {/* User Info */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="truncate font-semibold text-slate-900">
              {chat.name}
            </h3>

            <span className="text-xs text-slate-400">
              {new Date(chat.time).toLocaleDateString()}
            </span>
          </div>

          <p className="truncate text-sm text-slate-500">{chat.last_message}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
