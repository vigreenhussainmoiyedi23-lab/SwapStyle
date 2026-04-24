// ProductCard.jsx
import React from "react";
import { Edit, LocateIcon, Trash } from "lucide-react";
import useAuth from "../../../auth/hooks/useAuth";
import { Link } from "react-router-dom";
import { useListing } from "../../hooks/useListing";
const ProductCard = ({ item }) => {
  const { user } = useAuth();
  const { deleteListing } = useListing();
  return (
    <Link
      to={`/listings/more/${item._id}`}
      className="group bg-white/5 backdrop-blur-3xl text-accent-300 rounded-3xl overflow-hidden border border-transparent hover:border-accent-400/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
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
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
          {item.title}
        </h3>
        {/* <p className="text-brand-400 text-sm mt-1 flex items-center gap-1">
          {" "}
          <img src="/svg/location.png" className="w-4" alt="" /> {item.location}
        </p> */}

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
