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

  return (
    <div>
      <h1 className="playfair text-3xl mb-4">Analytics</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 h-25 mb-10">
        <StatCard value={analyticsTotal.disputes} title={"Total Disputes"} />
        <StatCard value={analyticsTotal.listings} title={"Total Listings"} />
        <StatCard value={analyticsTotal.swaps} title={"Total Swaps"} />
        <StatCard value={analyticsTotal.users} title={"Total Users"} />
      </div>

      <h1 className="playfair text-3xl mb-4">Chart Analytics</h1>

      <TimeFilter selected={range} setSelected={setRange} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}
