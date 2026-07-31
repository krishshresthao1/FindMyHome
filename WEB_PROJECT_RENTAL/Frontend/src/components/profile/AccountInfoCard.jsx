const AccountInfoCard = ({ user }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Account Information</h2>

      <div className="space-y-5">
        <Info
          title="Email Verification"
          value={user.is_verified ? "Verified" : "Not Verified"}
        />

        <Info title="Login Method" value="Email & Password" />

      </div>
    </div>
  );
};

const Info = ({ title, value }) => (
  <div>
    <p className="text-sm text-slate-500">{title}</p>
    <h3 className="font-medium break-all">{value}</h3>
  </div>
);

export default AccountInfoCard;
