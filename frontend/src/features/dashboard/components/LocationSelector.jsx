import React, { useState } from "react";

const LocationSelector = ({ setLocationData }) => {
  const [mode, setMode] = useState("manual");
  const [manualCity, setManualCity] = useState("");
  const [manualState, setManualState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const log = position.coords.longitude;

        try {
          // Reverse Geocoding (OpenStreetMap - FREE)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${log}&format=json`,
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          const state = data.address.state || "";

          setLocationData({
            lat,
            log,
            city,
            State: state,
          });
        } catch (err) {
          console.error(err);
          setLocationData({
            lat,
            log,
            city: "",
            State: "",
          });
        }

        setLoading(false);
      },
      (error) => {
        console.error(error);
        alert("Permission denied or failed to fetch location");
        setLoading(false);
      },
    );
  };
  const validateLocation = async (city, state) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${city}&state=${state}&format=json`,
      );
      const data = await res.json();

      if (data.length === 0) {
        return { valid: false };
      }

      return {
        valid: true,
        lat: data[0].lat,
        log: data[0].lon,
        displayName: data[0].display_name,
      };
    } catch (err) {
      console.error(err);
      return { valid: false };
    }
  };
  const handleManualSubmit = () => {
   validateLocation(manualCity, manualState).then((res) => {
    if (res.valid) {
      setLocationData({
        lat: res.lat,
        log: res.log,
        city: manualCity,
        State: manualState,
      });
    }
    else {
      alert("Invalid Location")
    }
   })
  };

  return (
    <div className="p-4 ">
      <label className="font-semibold text-lg">Location</label>

      {/* Radio Buttons */}
      <div className="flex gap-4 mt-2">
        <label>
          <input
            type="radio"
            value="manual"
            checked={mode === "manual"}
            onChange={() => setMode("manual")}
          />
          Manual
        </label>

        <label>
          <input
            type="radio"
            value="auto"
            checked={mode === "auto"}
            onChange={() => {
              setMode("auto");
              handleGetLocation();
            }}
          />
          Use Current Location
        </label>
      </div>

      {/* Manual Inputs */}
      {mode === "manual" && (
        <div className="mt-3 flex flex-col gap-2">
          <input
            type="text"
            placeholder="City"
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={manualState}
            onChange={(e) => setManualState(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={handleManualSubmit}
            className="bg-brand-500 text-white p-2 rounded"
          >
            Save Location
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="mt-2 text-sm">Fetching location...</p>}
    </div>
  );
};

export default LocationSelector;
