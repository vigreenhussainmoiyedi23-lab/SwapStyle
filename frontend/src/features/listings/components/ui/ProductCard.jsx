// ProductCard.jsx
import React from "react";
import { Edit, LocateIcon, Star, Trash } from "lucide-react";
import useAuth from "../../../auth/hooks/useAuth";
import { Link } from "react-router-dom";
import { useListing } from "../../hooks/useListing";
const ProductCard = ({ item }) => {
  const { user } = useAuth();
  const { deleteListing } = useListing();
  return (
    <Link
      to={`/listings/more/${item._id}`}
      className="group bg-white/5 h-full w-full backdrop-blur-3xl text-accent-300 rounded-3xl overflow-hidden border border-transparent hover:border-accent-400/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center gap-2 px-1 mb-2">
        <img
          src={item.owner.profilePicture}
          alt="profilePicture"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-gray-300">{item.owner.username}</h1>
          <p className="flex items-center gap-1">
            {item.owner.rating} <Star className="stroke-brand-300"/>
          </p>
        </div>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item?.images[0]?.url}
          alt={item.title}
          className="w-full h-full  object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 text-white bg-black/70 px-3 py-1 rounded-full text-xs font-medium capitalize">
          {item.condition.replace("_", " ")}
        </div>
        {user && user?._id.toString() === item?.owner.toString() && (
          <div className=" text-black z-10 absolute bottom-0 right-0 justify-between flex w-full mt-3 px-3 py-1 rounded-xl text-xs font-medium capitalize">
            <button
              className="flex items-center bg-brand-300 rounded-2xl px-2 py-1  gap-2 justify-center"
              onClick={() =>
                (window.location.href = `/listings/update/${item._id}`)
              }
            >
              Update <Edit className="w-4" />
            </button>
            <button
              onClick={(e) => {
                let isDeleted = window.confirm(
                  "Are you sure you want to delete this listing?",
                );
                if (isDeleted) {
                  deleteListing(item._id);
                }
              }}
              className="flex items-center bg-red-600 rounded-2xl px-2 py-1  gap-2 justify-center text-white "
            >
              Delete <Trash className="w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 capitalize">
          {item.title}
        </h3>
        <p className="text-brand-400 text-sm mt-1 flex items-center gap-1 line-clamp-2 capitalize">
          {item.description}
        </p>

        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-xs text-brand-500">
              {item.size} • {item.clothingType}
            </p>
          </div>
          {/* You can add price here later */}
          <p className="font-semibold text-accent-500">
            ₹ {item.estimatedValue}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
