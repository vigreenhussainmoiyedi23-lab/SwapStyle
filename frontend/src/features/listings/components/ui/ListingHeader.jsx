// ListingHeader.jsx
import React from "react";

const ListingHeader = ({ sortBy, setSortBy, itemCount, search, setSearch }) => {
  return (
    <div className="sticky top-0 z-10 bg-brand-900 border-b border-brand-700 px-6 py-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex-1 max-w-lg">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search hoodies, sarees, jeans..."
          className="w-full bg-brand-800 border border-brand-700 focus:border-accent-400 rounded-2xl px-6 py-3 text-sm focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-brand-800 border border-brand-700 rounded-2xl px-6 py-3 text-sm focus:outline-none cursor-pointer"
        >
          <option value="newest" className=" bg-brand-900 text-accent-300">
            Newest First
          </option>
          <option value="oldest" className=" bg-brand-900 text-accent-300">
            Oldest First
          </option>
          <option value="price-low" className=" bg-brand-900 text-accent-300">
            Price: Low to High
          </option>
          <option value="price-high" className=" bg-brand-900 text-accent-300">
            Price: High to Low
          </option>
          <option value="condition" className=" bg-brand-900 text-accent-300">
            Best Condition
          </option>
        </select>

        <div className="text-sm text-brand-400 whitespace-nowrap">
          {itemCount} items
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
