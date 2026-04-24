import React from "react";

const RecentSwaps = ({user}) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="mb-4 text-lg">Recent Swaps (dummy)</h3>

      <div className="space-y-4">
        {[
          { item: "Denim Jacket", user: "Aria L.", status: "Completed" },
          { item: "Wool Coat", user: "Noah P.", status: "Completed" },
          { item: "Silk Dress", user: "Mia R.", status: "Cancelled" },
        ].map((swap, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-white/10 pb-2"
          >
            <span>{swap.item}</span>
            <span>{swap.user}</span>
            <span
              className={
                swap.status === "Completed" ? "text-green-400" : "text-red-400"
              }
            >
              {swap.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSwaps;
