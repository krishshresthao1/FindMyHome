const PersonalInfoCard = ({ user }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Personal Information</h2>

      <div className="space-y-5">
        <Info title="Full Name" value={user.fullname} />

        <Info title="Email" value={user.email} />

        <Info title="Phone" value={user.phone} />

        <Info title="Role" value={user.role} />
      </div>
    </div>
  );
};

const Info = ({ title, value }) => (
  <div>
    <p className="text-sm text-slate-500">{title}</p>
    <h3 className="font-medium text-slate-800">{value}</h3>
  </div>
);

export default PersonalInfoCard;
