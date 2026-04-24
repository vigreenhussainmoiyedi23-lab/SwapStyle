import React from "react";

const UserAllListings = ({ listings }) => {
  return (
    <div className="w-full min-h-100">
      {!listings && (
        <div className="text-center py-20 text-brand-400">
          
        </div>
      )}
    </div>
  );
};

export default UserAllListings;
