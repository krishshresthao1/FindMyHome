import { User, Home } from "lucide-react";

const ChatHeader = ({ selectedUser }) => {
  return (
    <div
      className="
      flex
      items-center
      gap-4
      border-b
      border-slate-200
      bg-white
      px-6
      py-4
    "
    >
      {/* Avatar */}
      <div
        className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        bg-blue-100
      "
      >
        <User className="text-blue-600" />
      </div>

      {/* Info */}
      <div>
        <h2 className="font-semibold text-slate-900">{selectedUser.name}</h2>

        <div
          className="
          flex
          items-center
          gap-1
          text-sm
          text-slate-500
        "
        >
          <Home size={14} />

          {selectedUser.property_title}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
