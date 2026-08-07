import { FaCircle } from "react-icons/fa";

const ActivityCard = ({ user }) => {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Activity</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Stat title="Saved Properties" value={user.favourites?.length || 0} />
        <Stat title="Properties Posted" value={user.properties_posted} />
        <Stat title="Profile Status" value="Active" />
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => {
  const isActive = value === "Active";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>

      {isActive ? (
        <div className="mt-2 flex items-center gap-2">
          <FaCircle className="text-xs text-green-500" />
          <span className="text-3xl font-bold text-green-600">{value}</span>
        </div>
      ) : (
        <h3 className="mt-2 text-3xl font-bold text-blue-600">{value}</h3>
      )}
    </div>
  );
};

export default ActivityCard;
