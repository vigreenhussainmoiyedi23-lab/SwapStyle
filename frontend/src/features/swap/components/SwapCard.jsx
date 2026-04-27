import React from "react";
import { ArrowRightLeft } from "lucide-react";
import ProductCard from "../../listings/components/ui/ProductCard";
import useSwap from "../hooks/useSwap";
import { useChatHttp } from "../../chats/hooks/useChatHttp";
import { useNavigate } from "react-router-dom";
const SwapCard = ({ swap }) => {
  const { chatAccessHandler } = useChatHttp();
  let role = swap.role;
  let otherUserRole = role == "owner" ? "requester" : "owner";
  let status = swap.status;
  const navigate = useNavigate();
  const {
    acceptSwapHandler,
    rejectSwapHandler,
    cancelSwapHandler,
    completeSwapHandler,
    shipmentDetailsHandler,
    changeShipmentTypeSwapRequestHandler,
    loading,
  } = useSwap();
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
      <div className="mt-4 flex gap-2 relative items-center justify-center lg:flex-row flex-col">
        {role === "owner" && status === "pending" && (
          <>
            <button
              onClick={() => acceptSwapHandler(swap._id)}
              className="bg-accent-500 px-3 py-2 rounded-lg w-full"
            >
              Accept
            </button>
            <button
              onClick={() => rejectSwapHandler(swap._id)}
              className="bg-red-600 px-3 py-2 rounded-lg w-full"
            >
              Reject
            </button>
          </>
        )}

        {role === "requester" && status === "pending" && (
          <button
            onClick={() => cancelSwapHandler(swap._id)}
            className="bg-red-500 px-3 py-2 rounded-lg w-1/2 "
          >
            Withdraw Request (cancel)
          </button>
        )}
        {swap.hasShipped && !swap.hasCompleted && status === "accepted" && (
          <>
            <button
              onClick={() => completeSwapHandler(swap._id)}
              className="bg-yellow-500 whitespace-nowrap source-code-pro px-3 py-2 rounded-lg w-1/2 "
            >
              Complete Request
            </button>
          </>
        )}
        {swap.hasShipped && swap.hasCompleted && status === "accepted" && (
          <>
            {swap.shipment_type == "shipping" && <button>View Shipment</button>}
          </>
        )}
        {status === "accepted" && (
          <>
            <button
              onClick={async () => {
                const response = await chatAccessHandler(
                  swap[otherUserRole]._id,
                );
                navigate(`/chats/${response.chatId}`);
              }}
              className="bg-accent-500 text-brand-900 font-bold source-code-pro whitespace-nowrap px-3 py-2 rounded-lg w-full"
            >
              Negotiate With{" "}
              {role == "owner" ? swap.requester.username : swap.owner.username}
            </button>
            {swap.shipment_type == "shipping" && (
              <button className="bg-brand-500 px-3 py-2 rounded-lg w-full">
                Add Shipping
              </button>
            )}
            {!swap.hasCompleted && !swap.completedBy[otherUserRole] && (
              <div className="px-3 py-2 mt-5 lg:mt-0 rounded-lg w-full flex items-center  relative  flex-col">
                <label
                  className=" text-gray-500 px-3 py-2 rounded-lg absolute -top-6 overflow-hidden h-fit whitespace-nowrap"
                  htmlFor="shipmentType"
                >
                  Change Shipping Type
                </label>
                <select
                  onChange={(e) => {
                    if (loading) return alert("Please wait");
                    changeShipmentTypeSwapRequestHandler(
                      swap._id,
                      e.target.value,
                    );
                  }}
                  value={swap.shipment_type}
                  name="shipmentType"
                  id="shipmentType"
                  className="outline-none w-full text-center h-full bg-brand-900 rounded-lg px-2 py-1 flex items-center justify-center"
                >
                  <option value="local_swap">Local Swap</option>
                  <option value="shipping">Shipping</option>
                </select>
              </div>
            )}
          </>
        )}

        {status === "completed" && (
          <span className="text-green-400 text-sm ">Completed</span>
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
          <p className="text-brand-900 font-bold text-xl flex flex-col">
            ₹ {item.estimatedValue}
            <span className="text-xs text-brand-300 ">Estimated Value</span>
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
