import React from "react";

const SwapFilters = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "All Swaps", value: "all" },
    { label: "Incoming Requests", value: "incoming" },
    { label: "Sent Requests", value: "sent" },
    { label: "Active Swaps", value: "active" },
    { label: "Completed Swaps", value: "completed" },
    { label: "Declined Swaps", value: "declined" },
  ];

  return (
    <div className="w-full hidden md:block min-h-screen bg-brand-900 border-r border-brand-700 p-5 text-white">
      
      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      {/* Status Filters */}
      <div>
        <p className="text-sm text-gray-400 mb-3">Swap Status</p>

        <div className="flex flex-col gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveFilter(item.value)}
              className={`text-left px-4 py-2 rounded-lg transition ${
                activeFilter === item.value
                  ? "bg-accent-500 text-black font-medium"
                  : "bg-brand-700 hover:bg-brand-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-brand-700" />

      {/* Optional Extra Filters */}
      <div>
        <p className="text-sm text-gray-400 mb-3">Shipping Type</p>

        <div className="flex flex-col gap-2">
          <button className="bg-brand-700 hover:bg-brand-500 px-4 py-2 rounded-lg text-left">
            Local Swap
          </button>
          <button className="bg-brand-700 hover:bg-brand-500 px-4 py-2 rounded-lg text-left">
            Shipping
          </button>
        </div>
      </div>

      {/* Clear Button */}
      <button className="mt-8 text-red-400 text-sm hover:underline">
        Clear Filters
      </button>
    </div>
  );
};

export default SwapFilters;