import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useListing } from "../hooks/useListing";
import MyListingsOverlay from "../components/ListingMore/MyListingsOverlay";
import { AuthContext } from "../../auth/auth.context";
import { useContext } from "react";
import { useProfile } from "../../Profile/Hooks/useProfile";

const ListingMore = () => {
  const { id } = useParams();
  const { getListingById } = useListing();
  const [listing, setlisting] = useState({});
  useEffect(() => {
    async function fetchListing() {
      const data = await getListingById(id);
      setlisting(data.listing);
    }
    fetchListing();
  }, [id]);

  if (!listing) return <div>Loading...</div>;
  const [isActive, setIsActive] = useState(false);

  const { fetchUserAllListings,userAllListings } = useProfile();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      console.log("fetching user all listingsa");
       await fetchUserAllListings(user?._id);
       console.log(userAllListings)
    };
    fetch();
  }, [user]);
  return (
    <div className="min-h-screen relative mt-[10vh] bg-[var(--color-brand-900)] text-white p-6">
      <div className="max-w-6xl relative mx-auto grid md:grid-cols-2 gap-8">
        {/* LEFT: IMAGES */}
        <div>
          <img
            src={ listing.images?.[0]?.url}
            alt={listing.title}
            className="w-fit h-100 object-contain rounded-2xl border border-[var(--color-brand-700)]"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            { listing.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border border-[var(--color-brand-700)] cursor-pointer"
              />
            ))}
          </div>
        </div>
        <MyListingsOverlay
          listing={listing}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        {/* RIGHT: DETAILS */}
        <div className="bg-[var(--color-brand-700)] p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-3">{listing.title}</h1>

          <p className="text-gray-300 mb-4">{listing.description}</p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[ listing.category,  listing.clothingType,  listing.size,  listing.condition].map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[var(--color-brand-500)] rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {/* DETAILS */}
          <div className="space-y-2 text-sm">
            <p>
              <strong>Brand:</strong> { listing.brandName}
            </p>
            <p>
              <strong>Estimated Value:</strong> ₹{ listing.estimatedValue}
            </p>
            <p>
              <strong>Location:</strong> { listing.Location?.city}, { listing.Location?.State}
            </p>
          </div>

          {/* OWNER INFO */}
          <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-brand-500)] pt-4">
            <img
              src={ listing.owner?.profilePicture}
              alt="owner"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{ listing.owner?.username}</p>
              <p className="text-xs text-gray-300">
                ⭐ { listing.owner?.rating} | Swaps: { listing.owner?.totalSwaps}
              </p>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={() => setIsActive(true)}
            className="mt-6 w-full bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-300)] transition py-3 rounded-xl font-semibold"
          >
            Request Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingMore;
