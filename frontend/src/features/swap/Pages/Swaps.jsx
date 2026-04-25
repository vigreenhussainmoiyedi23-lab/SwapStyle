import React, { useEffect } from "react";
import SwapCard from "../components/SwapCard";
import SwapFilters from "../components/SwapFilters";
import useSwap from "../hooks/useSwap";
import useAuth from "../../auth/hooks/useAuth";

const Swaps = () => {
  let typeConditions = {
    incoming: {
      role: "requester",
      status: "pending",
    },
    sent: {
      role: "owner",
      status: "pending",
    },
    active: {
      role: "owner" || "requester",
      status: "active",
    },
    declined: {
      role: "owner" || "requester",
      status: "rejected" || "cancelled",
    },
    completed: {
      role: "owner" || "requester",
      status: "completed",
    },
  };
  const { userAllSwaps, loading } = useSwap();
  if (loading || !userAllSwaps)
    return (
      <div className="bg-brand-900 min-h-screen w-full text-5xl flex items-center justify-center text-white">
        loading
      </div>
    );
  console.log(userAllSwaps);
  return (
    <div className="w-full min-h-screen bg-brand-900 relative pt-[12vh]">
      <div className="fixed top-[10vh] left-0 w-80">
        <SwapFilters />
      </div>
      <div className="flex flex-col  gap-4 px-3 py-2  md:ml-80">
        {userAllSwaps &&
          userAllSwaps.swaps.map((swap) => {
      
            return <SwapCard swap={swap} />;
          })}
      </div>
      <div className="flex items-center justify-center">
        {userAllSwaps.totalPages}
      </div>
    </div>
  );
};

export default Swaps;
