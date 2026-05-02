import { Link } from "react-router-dom";

const FooterCTA = () => {
  return (
    <div className="w-full bg-brand-900 px-4 py-16">

      {/* Card */}
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10 md:p-14">

        {/* subtle glow background */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative text-center">

          {/* Trust badge */}
          <p className="text-xs uppercase tracking-widest text-brand-300 mb-3">
            Sustainable Fashion Marketplace
          </p>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-semibold text-white leading-snug">
            Don’t let unused clothes sit idle —
            <br />
            turn them into swaps, value, and new styles
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Every listing on SwapStyle helps reduce waste and gives your wardrobe a second life.
            Join users already swapping instead of buying new.
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-8 mt-8 text-sm text-gray-400">
            <div>
              <p className="text-white text-lg font-semibold">100+</p>
              <p>Swaps Completed</p>
            </div>
            <div>
              <p className="text-white text-lg font-semibold">Real Users</p>
              <p>Verified Community</p>
            </div>
            <div>
              <p className="text-white text-lg font-semibold">Eco Impact</p>
              <p>Less Waste</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">

            <Link
              to="/listings"
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium transition shadow-lg shadow-brand-500/20"
            >
              Start Swapping
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 rounded-xl border border-white/15 text-white font-medium hover:bg-white/10 transition"
            >
              Create Account
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FooterCTA;