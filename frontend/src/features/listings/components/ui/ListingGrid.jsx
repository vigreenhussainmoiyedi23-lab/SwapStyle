// ListingGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ListingGrid = ({ listings }) => {
  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-20 text-brand-400">
          No items match your filters. Try clearing some filters.
        </div>
      )}
    </div>
  );
};

export default ListingGrid;