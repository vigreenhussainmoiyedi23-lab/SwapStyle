import React, { useState } from "react";
import { Star } from "lucide-react";
import useSwap from "../hooks/useSwap";

const RateUser = ({ swapId, rateeId, raterId }) => {
  const [open, setOpen] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const { createRatingHandler } = useSwap();
  const [form, setForm] = useState({
    ratingValue: 5,
    comment: "",
  });

  // 🔥 MOCK API (replace tomorrow with backend)
  const mockCheckRating = async () => {
    return false; // pretend user hasn't rated yet
  };

  const mockSubmitRating = async (data) => {
    console.log("Submitting rating:", data);
    return true;
  };

  React.useEffect(() => {
    const check = async () => {
      const res = await mockCheckRating();
      setHasRated(res);
    };
    check();
  }, []);

  const submitHandler = async () => {
    const payload = {
      swapId,
      ratee: rateeId,
      ...form,
    };

    await createRatingHandler(swapId, payload);
    setHasRated(true);
    setOpen(false);
  };

  return (
    <div>
      {/* BUTTON */}
      {!hasRated ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition"
        >
          <Star size={18} />
          Rate User
        </button>
      ) : (
        <button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
          Already Rated
        </button>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-brand-300 w-[380px] p-5 rounded-xl flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Give Rating</h2>

            {/* ⭐ Stars UI */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">
                Rating: {form.ratingValue} ⭐
              </label>

              <input
                type="range"
                min="1"
                max="5"
                value={form.ratingValue}
                onChange={(e) =>
                  setForm({ ...form, ratingValue: Number(e.target.value) })
                }
              />
            </div>

            {/* 💬 Comment */}
            <textarea
              placeholder="Write a review..."
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="border p-2 rounded-md h-24 resize-none"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={submitHandler}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateUser;
