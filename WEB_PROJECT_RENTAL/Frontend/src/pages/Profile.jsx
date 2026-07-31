import { useEffect, useState } from "react";
import axios from "axios";

import ProfileHeader from "../components/Profile/ProfileHeader";
import PersonalInfoCard from "../components/Profile/PersonalInfoCard";
import AccountInfoCard from "../components/Profile/AccountInfoCard";
import ActivityCard from "../components/Profile/ActivityCard";
import QuickActionsCard from "../components/Profile/QuickActionsCard";
import DangerZoneCard from "../components/Profile/DangerZoneCard";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user)
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl space-y-6 px-6">
        <ProfileHeader user={user} />

        <div className="grid gap-6 lg:grid-cols-2">
          <PersonalInfoCard user={user} />
          <AccountInfoCard user={user} />
        </div>

        <ActivityCard user={user} />

        <QuickActionsCard />

        <DangerZoneCard />
      </div>
    </div>
  );
};

export default Profile;
