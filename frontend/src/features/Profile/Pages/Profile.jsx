import React, { useContext, useState } from "react";

import { AuthContext } from "../../auth/auth.context";
import MainDashboard from "../components/MainDashboard";
import { useParams } from "react-router-dom";
import { useProfile } from "../Hooks/useProfile";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const {
    fetchUserAllListings,
    fetchUserData,
    userAllListings,
    profileUser,
    loading,
  } = useProfile();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserAllListings(id);
        await fetchUserData(id);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    fetchData();
  }, [id]);
  if (loading) {
    return <section className="w-full relative min-h-screen bg-brand-900 text-white">
      <div className=" pt-[12vh] px-10">
       LODING...
      </div>
    </section>;
  }
  return (
    <section className="w-full relative min-h-screen bg-brand-900 text-white">
      <div className=" pt-[12vh] px-10">
        <MainDashboard user={profileUser} listings={userAllListings} />
      </div>
    </section>
  );
};

export default Profile;
