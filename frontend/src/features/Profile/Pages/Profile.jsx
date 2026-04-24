import React, { useContext, useState } from "react";

import { AuthContext } from "../../auth/auth.context";
import MainDashboard from "../components/MainDashboard";
import { useParams } from "react-router-dom";
// import EditProfile from "../components/EditProfile";
// import Security from "../components/Security";
// import SwapHistory from "../components/SwapHistory";
// import Reviews from "../components/Reviews";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  return (
    <section className="w-full relative min-h-screen bg-brand-900 text-white">
      <div className=" pt-[12vh] px-10">
        <MainDashboard user={user} listings={listings} />
      </div>
    </section>
  );
};

export default Profile;
