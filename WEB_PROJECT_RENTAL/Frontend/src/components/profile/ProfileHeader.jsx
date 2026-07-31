const ProfileHeader = ({ user }) => {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
            {user.fullname.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {user.fullname}
            </h1>

            <p className="text-slate-500 capitalize">{user.role}</p>

            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {user.is_verified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
