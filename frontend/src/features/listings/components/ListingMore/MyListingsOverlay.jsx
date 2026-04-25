import { X } from "lucide-react";
import ListingHorizontalCard from "./ListingHorizontalCard";

const MyListingsOverlay = ({
  isActive,
  setIsActive,
  listing,
  createSwapHandler,
}) => {
  return (
    <div
      style={{ display: isActive ? "flex" : "none" }}
      className="absolute top-0 left-0 w-full h-full bg-brand-900  items-start justify-center"
    >
      <button
        onClick={() => setIsActive(false)}
        className="top-1 absolute right-1 z-10"
      >
        <X className="w-10 h-10 bg-accent-500 rounded-full " />
      </button>
      <div className="flex w-full min-h-screen md:flex-row flex-col items-center justify-center gap-4">
        <div className=" overflow-auto h-full w-full ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold text-white playfair mb-10">
            Select Your Listing to Swap
          </h1>
          <div className="min-h-screen flex flex-col gap-4">
            {listing &&
              listing.length > 0 &&
              listing.map((l) => {
                return (
                  <ListingHorizontalCard
                    listing={l}
                    createSwapHandler={createSwapHandler}
                    key={l._id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListingsOverlay;
