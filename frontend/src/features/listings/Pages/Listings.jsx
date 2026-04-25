// Listings.jsx
import { useEffect, useState } from "react";
import { CLOTHING_TYPES, CATEGORIES, SIZES, CONDITIONS } from "./enums.jsx";
import FiltersSidebar from "../components/ui/FilterSidebar.jsx";
import ListingHeader from "../components/ui/ListingHeader.jsx";
import ListingGrid from "../components/ui/ListingGrid.jsx";
import { useListing } from "../hooks/useListing.js";
import { Loader2 } from "lucide-react";

const Listings = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const { fetchListings, allListings, loading } = useListing();
  const [search, setSearch] = useState("");
  useEffect(() => {
    let filter = {
      category: selectedCategory,
      types: selectedTypes,
      sizes: selectedSizes,
      conditions: selectedConditions,
      sortBy: sortBy,
      search: search,
    };
    fetchListings(filter);
  }, [
    sortBy,
    selectedCategory,
    selectedTypes,
    selectedSizes,
    selectedConditions,
    search,
  ]);

  // Sample data (later replace with API or context)
  const listings = [
    /* your existing listings array */
  ];

  const filteredListings = listings.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(item.type);
    const sizeMatch =
      selectedSizes.length === 0 || selectedSizes.includes(item.size);
    const conditionMatch =
      selectedConditions.length === 0 ||
      selectedConditions.includes(item.condition);

    return categoryMatch && typeMatch && sizeMatch && conditionMatch;
  });

  // Sorting logic
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "condition") {
      const conditionOrder = { new: 4, like_new: 3, good: 2, fair: 1 };
      return (
        (conditionOrder[b.condition] || 0) - (conditionOrder[a.condition] || 0)
      );
    }
    return 0; // newest (default - you can add date logic later)
  });

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedConditions([]);
  };

  const toggleArray = (arr, setArr, value) => {
    if (arr.includes(value)) {
      setArr(arr.filter((v) => v !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  return (
    <section className="w-full pt-[10vh] min-h-screen bg-brand-900 text-white">
      {/* Filters Sidebar */}
      <FiltersSidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        selectedConditions={selectedConditions}
        setSelectedConditions={setSelectedConditions}
        clearAllFilters={clearAllFilters}
        CATEGORIES={CATEGORIES}
        CLOTHING_TYPES={CLOTHING_TYPES}
        SIZES={SIZES}
        CONDITIONS={CONDITIONS}
        toggleArray={toggleArray}
      />

      {/* Main Content Area */}
      <div className="relative md:ml-80 min-h-[90dvh] bg-brand-900">
        <ListingHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          search={search}
          setSearch={setSearch}
          itemCount={allListings.length}
        />

        {!loading && <ListingGrid listings={allListings} />}
        {loading && <div className="flex items-center justify-center text-6xl h-screen w-full">
          Loading Lisitings...
          </div>}
      </div>
    </section>
  );
};

export default Listings;
