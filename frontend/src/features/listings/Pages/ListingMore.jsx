import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useListing } from "../hooks/useListing";

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

  const {
    title,
    description,
    clothingType,
    category,
    size,
    condition,
    brandName,
    estimatedValue,
    images,
    Location,
    owner,
  } = listing;

  return (
    <div className="min-h-screen mt-[10vh] bg-[var(--color-brand-900)] text-white p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* LEFT: IMAGES */}
        <div>
          <img
            src={images?.[0]?.url}
            alt={title}
            className="w-fit h-100 object-contain rounded-2xl border border-[var(--color-brand-700)]"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border border-[var(--color-brand-700)] cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="bg-[var(--color-brand-700)] p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-3">{title}</h1>

          <p className="text-gray-300 mb-4">{description}</p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[category, clothingType, size, condition].map((item, i) => (
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
              <strong>Brand:</strong> {brandName}
            </p>
            <p>
              <strong>Estimated Value:</strong> ₹{estimatedValue}
            </p>
            <p>
              <strong>Location:</strong> {Location?.city}, {Location?.State}
            </p>
          </div>

          {/* OWNER INFO */}
          <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-brand-500)] pt-4">
            <img
              src={owner?.profilePicture}
              alt="owner"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{owner?.username}</p>
              <p className="text-xs text-gray-300">
                ⭐ {owner?.rating} | Swaps: {owner?.totalSwaps}
              </p>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button className="mt-6 w-full bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-300)] transition py-3 rounded-xl font-semibold">
            Request Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingMore;
