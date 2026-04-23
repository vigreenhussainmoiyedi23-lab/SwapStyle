import React from "react";
import ProfileHeader from "./ProfileHeader";
import SwapsBreifHistory from "./SwapsBreifHistory";
import RecentSwaps from "./RecentSwaps";

const MainDashboard = ({user}) => {
  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader user={user}/>
      <SwapsBreifHistory user={user}/>
      <RecentSwaps user={user}/>
    </div>
  );
};

export default MainDashboard;
