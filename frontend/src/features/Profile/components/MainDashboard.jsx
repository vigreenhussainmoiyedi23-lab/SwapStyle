import React from "react";
import ProfileHeader from "./dashboard/ProfileHeader";
import SwapsBreifHistory from "./dashboard/SwapsBreifHistory";
import RecentSwaps from "./dashboard/RecentSwaps";
import UserAllListings from "./dashboard/UserAllListings";

const MainDashboard = ({user,listings,isOwner}) => {
  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader user={user}/>
      <SwapsBreifHistory user={user}/>
      <UserAllListings listings={listings} isOwner={isOwner}/>
      <RecentSwaps user={user}/>
    </div>
  );
};

export default MainDashboard;
