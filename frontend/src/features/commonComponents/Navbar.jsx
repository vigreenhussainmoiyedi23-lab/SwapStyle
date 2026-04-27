import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Bell, Plus } from "lucide-react";

const Navbar = ({ user }) => {
  return (
    <nav className="bg-[#0a140f] w-full fixed text-white border-b border-white/10 py-5  top-0 z-50">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <Logo />
        </div>

        {user &&<div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            to="/listings"
            className="hover:text-emerald-400 transition-colors"
          >
            Listings
          </Link>
          <Link to="/swaps" className="hover:text-emerald-400 transition-colors">
            Swaps
          </Link>
          <Link to="/chats" className="hover:text-emerald-400 transition-colors">
            Chats
          </Link>
        </div>}

        {!user && (
          <div className="flex items-center sm:gap-4 sm:scale-100 scale-70 gap-2">
            <Link
              to="/login"
              className="px-6 py-2 text-sm font-medium hover:bg-white/10 rounded-xl transition-all"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold rounded-xl transition-all"
            >
              Join Free
            </Link>
          </div>
        )}
        {user && (
          <div className="flex items-center sm:gap-6 sm:scale-100 scale-70 gap-2">
            <Link
              to="/createListing"
              className=" text-sm py-1 gap-3 font-medium hidden  md:flex items-center border border-bg-main text-bg-main px-3 rounded-xl transition-all "
            >
              <Plus className="w-8 h-8 " /> 
              <span className="font-bold text-base">List Item</span>
            </Link>
            <Link
              to="/notifications"
              className=" text-sm font-medium hover:bg-white/10 rounded-xl transition-all flex flex-col items-center justify-end gap-1"
            >
              <Bell className="w-6 h-6 " />
              <p className="text-xs text-gray-300">notifications</p>
            </Link>
            <Link
              to={`/profile/${user._id}`}
              className="h-12 w-12 md:flex hidden rounded-full border border-brand-300 text-sm font-semibold  overflow-hidden transition-all"
            >
              <img
                src={
                  user?.profilePicture ||
                  "https://ik.imagekit.io/h110m786/pfp.jpg?updatedAt=1776606585390"
                }
                className="h-full "
                alt="profilePicture"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
