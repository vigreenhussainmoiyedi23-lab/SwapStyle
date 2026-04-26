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
      status: "accepted",
    },
    declined: {
      type: "all",
      status: ["rejected", "cancelled"],
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
  shipment_type;
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
      console.log(userAllSwaps);
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
        {userAllSwaps && userAllSwaps.swaps.length === 0 && (
          <div className="bg-brand-900 min-h-screen w-full  flex-col flex items-center justify-center text-white">
            <h3 className="text-accent-500 text-5xl lg:text-6xl xl:text-7xl mb-2 playfair font-bold underline  decoration-brand-300">
              No Swaps Found
            </h3>
            <p className="text-sm montserrat text-gray-200 md:text-base lg:text-lg mb-7 ">
              Try clearing some filters
              <br />
              Or create a new swap
            </p>
            <button className="bg-accent-500 text-brand-900 font-bold source-code-pro text-xl lg:text-2xl px-4 py-2 rounded-lg">Go Back To Listings</button>
          </div>
        )}
      </div>
      {(loading || !userAllSwaps) && (
        <div className="bg-brand-900 min-h-screen w-full text-5xl flex items-center justify-center text-white">
          loading
        </div>
      )}
    </div>
  );
};

export default Swaps;
