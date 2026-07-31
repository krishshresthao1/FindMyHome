import { useNavigate } from "react-router-dom";

const QuickActionsCard = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/saved")}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          Saved Properties
        </button>

        <button className="rounded-xl border px-5 py-3">Change Password</button>
      </div>
    </div>
  );
};

export default QuickActionsCard;
