import { X } from "lucide-react";

const MyListingsOverlay = ({ isActive, setIsActive, listing }) => {
  return (
    <div
      style={{ display: isActive ? "flex" : "none" }}
      className="absolute top-0 left-0 w-full h-full bg-brand-900  items-start justify-center"
    >
      <button
        onClick={() => setIsActive(false)}
        className="top-4 absolute right-4"
      >
        <X className="w-10 h-10 bg-accent-500 rounded-full z-10" />
      </button>
      <div className="flex w-full h-full md:flex-row flex-col items-center justify-center gap-4">
        <div className="md:w-1/3 h-full w-full ">
          <h1 className="text-3xl  font-bold text-white playfair ">
            Other Users Listing
          </h1>
          <div>
            <img
              src={listing?.images?.[0]?.url}
              alt={listing.title}
              className="w-fit h-100 object-contain rounded-2xl border border-[var(--color-brand-700)]"
            />
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {listing.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border border-[var(--color-brand-700)] cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-2/3 overflow-auto h-full w-full ">
          <h1 className="text-3xl  font-bold text-white playfair ">
            Select Your Listing to Swap
          </h1>
          <div className="bg-bg-main h-75 rounded-xl overflow-hidden text-brand-900 w-full max-h-75 xl:max-h-100 flex items-center gap-3">
            <div className="h-full w-1/3 relative">
              <img
                src="/models/ahmad-ebadi-ot28ybNQ-Is-unsplash.jpg"
                className="absolute left-0 w-full h-full object-contain rounded-xl"
                alt="listingImage"
              />
            </div>
            <div className="h-full w-2/3 py-2 relative justify-center flex flex-col ">
              <h3 
              className="text-3xl lg:text-4xl  font-bold text-brand-700 montserrat"
              >€850
              </h3>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-900 playfair ">
                The Listing Title{" "}
              </h1>
              <div className=" flex items-center justify-start gap-3 mt-1 mb-2">
                <p className="bg-brand-900 text-white rounded-xl px-3 text-sm">
                  new
                </p>
                <p className="bg-brand-900 text-white rounded-xl px-3 text-sm">
                  type
                </p>
                <p className="bg-brand-900 text-white rounded-xl px-3 text-sm">
                  size
                </p>
              </div>
              <p className="text-xs lg:text-sm xl:text-base montserrat text-brand-700 line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                quaerat illo pariatur repellat? Harum aliquid, consectetur
                possimus eius odit tempora repellat debitis quibusdam.
              </p>
              <button className="bg-brand-900 text-accent-300 w-fit px-5 py-2 rounded-full mt-4 source-code-pro text-lg  tracking-wide hover:bg-black hover:scale-99 transition-all ease-in-out duration-125 active:scale-95  md:text-xl">Offer This Listing</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListingsOverlay;
