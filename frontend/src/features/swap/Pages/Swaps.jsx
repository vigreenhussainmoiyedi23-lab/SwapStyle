import React, { useEffect, useState } from "react";
import SwapCard from "../components/SwapCard";
import SwapFilters from "../components/SwapFilters";
import useSwap from "../hooks/useSwap";
import useAuth from "../../auth/hooks/useAuth";

const Swaps = () => {
  let typeConditions = {
    incoming: {
      type: "received",
      status: "pending",
    },
    sent: {
      type: "sent",
      status: "pending",
    },
    active: {
      type: "all",
      status: "active",
    },
    declined: {
      type: "all",
      status: "rejected" || "cancelled",
    },
    completed: {
      type: "all",
      status: "completed",
    },
    all: {
      type: "all",
      status: "all",
    },
  };
  const [activeFilter, setActiveFilter] = useState("all");
  const { userAllSwaps, loading, getSwapRequests } = useSwap();
  const [shipment_type, setShipment_type] = useState("all");
  const [page, setPage] = useState(1);
  (shipment_type);
  useEffect(() => {
    const second = async () => {
      const filters = {
        status: typeConditions[activeFilter].status,
        type: typeConditions[activeFilter].type,
        shipment_type,
        limit: 10,
        page: page,
      };
      await getSwapRequests({ filters });
    };
    second();
  }, [activeFilter, shipment_type]);

  return (
    <div className="w-full min-h-screen bg-brand-900 relative pt-[12vh]">
      <div className="fixed top-[10vh] left-0 w-80">
        <SwapFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          shipment_type={shipment_type}
          setShipment_type={setShipment_type}
        />
      </div>
      <div className="flex flex-col  gap-4 px-3 py-2  md:ml-80">
        {userAllSwaps &&
          userAllSwaps.swaps.map((swap) => {
            return <SwapCard swap={swap} />;
          })}
      </div>
      {(loading || !userAllSwaps) && (
        <div className="bg-brand-900 min-h-screen w-full text-5xl flex items-center justify-center text-white">
          loading
        </div>
      )}
      <div className="flex items-center justify-center">
        {userAllSwaps?.totalPages}
      </div>
    </div>
  );
};

export default Swaps;
