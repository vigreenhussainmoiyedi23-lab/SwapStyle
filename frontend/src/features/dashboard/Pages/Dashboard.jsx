import React, { useContext, useState } from "react";

import { AuthContext } from "../../auth/auth.context";
import MainDashboard from "../components/dashboard/MainDashboard";
// import EditProfile from "../components/EditProfile";
// import Security from "../components/Security";
// import SwapHistory from "../components/SwapHistory";
// import Reviews from "../components/Reviews";

const Dashboard = () => {
  const [selected, setSelected] = useState("dashboard");
  const {user} =useContext(AuthContext)
  return (
    <section className="w-full relative min-h-screen bg-brand-900 text-white">
      {/* Sidebar */}
  

      {/* Main Content */}
      <div className=" pt-[12vh] px-10">
        {selected === "dashboard" && <MainDashboard user={user}/>}
      </div>
    </section>
  );
};

export default Dashboard;
