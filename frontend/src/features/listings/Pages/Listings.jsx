// Listings.jsx
import { useEffect, useState } from "react";
import { CLOTHING_TYPES, CATEGORIES, SIZES, CONDITIONS } from "./enums.jsx";
import FiltersSidebar from "../components/ui/FilterSidebar.jsx";
import ListingHeader from "../components/ui/ListingHeader.jsx";
import ListingGrid from "../components/ui/ListingGrid.jsx";
import { useListing } from "../hooks/useListing.js";
import { Loader2 } from "lucide-react";

const Listings = () => {
  const { fetchListings, allListings, loading } = useListing();


  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
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
        {loading && (
          <div className="flex items-center justify-center text-6xl h-screen w-full">
            Loading Lisitings...
          </div>
        )}
      </div>
    </section>
  );
};

export default Listings;
