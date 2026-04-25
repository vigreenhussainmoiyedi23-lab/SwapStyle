import React from "react";
import { ArrowRightLeft } from "lucide-react";
import ProductCard from "../../listings/components/ui/ProductCard";
const SwapCard = ({ swap }) => {
  let role = swap.role;
  let status = swap.status;

  const diffrence = Math.abs(
    swap.ownerListing.estimatedValue - swap.requesterListing.estimatedValue,
  );
  return (
    <div className="bg-brand-700 rounded-2xl p-4 w-full max-w-6xl min-h-100 overflow-hidden text-white shadow-lg">
      {/* Profit / Loss */}
      <div className="mb-2">
        {diffrence < 100 ? (
          <span className="text-sm px-3 py-1 rounded-full bg-green-600">
            Fair Swap
          </span>
        ) : role === "owner" ? (
          <span className="text-sm px-3 py-1 rounded-full bg-red-600">
            Loss : {diffrence}
          </span>
        ) : (
          <span className="text-sm px-3 py-1 rounded-full bg-green-600">
            Profit: {diffrence}
          </span>
        )}
      </div>

      {/* Listings */}
      <div className=" items-center flex justify-between gap-2">
        <ListingCard item={swap.ownerListing} isOwner={role === "owner"} />
        {/* Swap Icon */}
        <ArrowRightLeft className="text-accent-400 w-1/5 h-12" />
        <ListingCard
          item={swap.requesterListing}
          isOwner={role === "requester"}
        />
      </div>

      {/* User + Message */}
      <div className="mt-3 text-sm text-gray-300">
        <p>Requested by {swap.requester.username}</p>
        <p className="text-xs italic">{swap.message}</p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-4 flex gap-2 items-center justify-center">
        {role === "owner" && status === "pending" && (
          <>
            <button className="bg-accent-500 px-3 py-2 rounded-lg w-full">
              Accept
            </button>
            <button className="bg-red-600 px-3 py-2 rounded-lg w-full">
              Reject
            </button>
          </>
        )}

        {role === "requester" && status === "pending" && (
          <button className="bg-red-500 px-3 py-2 rounded-lg w-1/2 ">
            Cancel Request
          </button>
        )}

        {status === "active" && (
          <>
            <button className="bg-accent-500 px-3 py-2 rounded-lg w-full">
              Chat
            </button>
            <button className="bg-brand-500 px-3 py-2 rounded-lg w-full">
              Add Shipping
            </button>
          </>
        )}

        {status === "completed" && (
          <span className="text-green-400 text-sm">Completed</span>
        )}

        {(status === "rejected" || status === "cancelled") && (
          <span className="text-red-400 text-sm">Declined</span>
        )}
      </div>
    </div>
  );
};
function ListingCard({ item, isOwner }) {
  return (
    <div className="w-full relative lg:h-75 lg:w-[48%] bg-accent-500 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col lg:flex-row">
      {/* Image */}
      <div className="lg:w-1/2 h-52 lg:h-auto overflow-hidden">
        <img
          src={item.images[0].url}
          alt="productImage"
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>
      {isOwner && (
        <p className="top-1 left-1 rounded-2xl px-3 py-1 absolute bg-brand-900 text-accent-500">
          Your Listing
        </p>
      )}
      {/* Content */}
      <div className="flex flex-col justify-between p-4 lg:w-1/2">
        {/* Top Section */}
        <div className="space-y-2">
          {/* 💰 Price FIRST */}
          <p className="text-white font-bold text-lg">
            ₹ {item.estimatedValue}
          </p>

          {/* 🏷 Title */}
          <h2 className="text-md font-semibold text-brand-900 line-clamp-1">
            {item.title}
          </h2>

          {/* 🏷 Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-brand-900  text-accent-500 text-xs px-3 py-1 rounded-full">
              {item.size}
            </span>
            <span className="bg-brand-900  text-accent-500 text-xs px-3 py-1 rounded-full">
              {item.condition.split("_").join(" ")}
            </span>
            <span className="bg-brand-900  text-accent-500 text-xs px-3 py-1 rounded-full">
              {item.brandName}
            </span>
          </div>

          {/* 📝 Description LAST */}
          <p className="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
export default SwapCard;
