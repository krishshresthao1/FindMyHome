const ActivityCard = ({ user }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Activity</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Stat title="Saved Properties" value={user.favourites?.length || 0} />

        <Stat title="Properties Posted" value={user.properties_posted} />

        <Stat title="Profile Status" value="Active" />
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="rounded-2xl bg-slate-100 p-5 text-center">
    <p className="text-sm text-slate-500">{title}</p>

    <h3 className="mt-2 text-3xl font-bold text-blue-600">{value}</h3>
  </div>
);

export default ActivityCard;
