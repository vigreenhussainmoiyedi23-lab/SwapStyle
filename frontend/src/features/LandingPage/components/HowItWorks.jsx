import {
  Handshake,
  MessageSquare,
  Search,
  Shield,
  Tag,
  UserPlus,
} from "lucide-react";
import React from "react";
import { motion, useScroll } from "motion/react";
const HowItWorks = () => {
  const { scrollYProgress } = useScroll();
  const steps = [
    {
      title: "Create Your Account",
      desc: "Sign up or log in to get started.",
      icon: <UserPlus className="w-6 h-6" />,
    },
    {
      title: "Add Your Listing",
      desc: "List what you want to offer from your profile.",
      icon: <Tag className="w-6 h-6" />,
    },
    {
      title: "Discover Matches",
      desc: "Browse listings and find items you like.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Send a Swap Request",
      desc: "Connect and request a swap with another user.",
      icon: <Handshake className="w-6 h-6" />,
    },
    {
      title: "Negotiate & Finalize",
      desc: "Agree on terms and complete the exchange.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "Resolve Issues (If Needed)",
      desc: "Raise a dispute and get fair support anytime.",
      icon: <Shield className="w-6 h-6" />,
    },
  ];
  return (
    <section
      id="how"
      className="py-24  bg-brand-900 relative rounded-t-[80px] border-t-accent-500 border-t-2 shadow-2xs shadow-pri"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl playfair md:text-5xl font-semibold mb-4">
            How It Works
          </h2>
          <p className="text-gray-400  montserrat text-sm">
            From listing to swapping — simple, clear, and secure
          </p>
        </div>

        {/* Flow Line */}
        <div className="absolute lg:left-1/2 left-2 top-40 bottom-20 w-[2px] bg-gradient-to-b from-transparent via-emerald-600/40 to-transparent  lg:block" />

        {/* Steps */}
        <div className="space-y-4 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, x: (i % 2 == 0 ? -1 : 1) * 50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col relative lg:flex-row items-center gap-8 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className="flex-1 w-full max-w-xl bg-[#13261f] border border-white/10 hover:border-emerald-500/40 rounded-3xl p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/20">
                <div className="flex  items-center source-code-pro gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400">
                    {step.icon}
                  </div>

                  <span className="text-sm text-emerald-500 font-semibold">
                    STEP {i + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold playfair tracking-wide mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-400 montserrat leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Connector Dot */}
              <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/40 z-10">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              <div className="absolute lg:hidden md:scale-75 scale-50 -translate-y-1/2 top-1/2 -left-8.5 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/40  z-10">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              {/* Spacer */}
              <div className="flex-1 hidden lg:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
