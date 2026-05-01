// /admin/pages/Dashboard.jsx

import { useState } from "react";
import AnalyticsChart from "../components/AnalyticsChart";
import TimeFilter from "../components/TimeFilter";
import { analyticsData } from "../data/dummyData";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";
import StatCard from "../components/Card";

export default function Dashboard() {
  const [range, setRange] = useState(7);

  const data = analyticsData[range];
  const {
    GetPlatformAnalyticsHandler,
    analyticsDaily,
    analyticsTotal,
    loading,
    insights,
  } = useAdmin();
  useEffect(() => {
    async function fetchAnalytics() {
      GetPlatformAnalyticsHandler();
    }
    fetchAnalytics();
  }, []);
  if (loading)
    return (
      <div className="bg-brand-900 text-5xl flex items-center justify-center animate-pulse min-h-screen w-full text-white ">
        loading...
      </div>
    );
  console.log(insights);
  return (
    <div className="w-full p-0">
      <h1 className="playfair text-3xl mb-4">Analytics</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 min-h-25 mb-10">
        <StatCard value={analyticsTotal.disputes} title={"Total Disputes"} />
        <StatCard value={analyticsTotal.listings} title={"Total Listings"} />
        <StatCard value={analyticsTotal.swaps} title={"Total Swaps"} />
        <StatCard value={analyticsTotal.users} title={"Total Users"} />
      </div>
      <div className="bg-brand-800  text-xl w-fit px-3 py-2 rounded-lg mb-10">
        <h1 className="text-accent-500 text-5xl playfair">AI Based Platform Insight</h1>
        <p className="text-gray-400 mt-4 montserrat">{insights || ""}</p>
      </div>
      <h1 className="playfair text-3xl mb-4">Chart Analytics</h1>
      <TimeFilter selected={range} setSelected={setRange} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-0 m-0 w-full">
        <AnalyticsChart
          data={analyticsDaily.users.slice(-range)}
          dataKey="users"
          title="User Growth"
        />

        <AnalyticsChart
          data={analyticsDaily.listings.slice(-range)}
          dataKey="listings"
          title="Listings Growth"
        />

        <AnalyticsChart
          data={analyticsDaily.swaps.slice(-range)}
          dataKey="swaps"
          title="Swaps Completed"
        />
        <AnalyticsChart
          data={analyticsDaily.disputes.slice(-range)}
          dataKey="disputes"
          title="Disputes Growth"
        />
      </div>
    </div>
  );
}
