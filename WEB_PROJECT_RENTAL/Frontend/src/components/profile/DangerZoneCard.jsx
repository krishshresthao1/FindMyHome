const DangerZoneCard = () => {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
      <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>

      <p className="mt-2 text-slate-600">
        Deleting your account is permanent and cannot be undone.
      </p>

      <button className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700">
        Delete Account
      </button>
    </div>
  );
};

export default DangerZoneCard;
