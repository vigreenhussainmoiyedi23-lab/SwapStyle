// /admin/pages/Dashboard.jsx

import { useState } from "react";
import AnalyticsChart from "../components/AnalyticsChart";
import TimeFilter from "../components/TimeFilter";
import { analyticsData } from "../data/dummyData";

export default function Dashboard() {
  const [range, setRange] = useState(7);

  const data = analyticsData[range];

  return (
    <div>
      <h1 className="playfair text-3xl mb-4">Analytics</h1>

      <TimeFilter selected={range} setSelected={setRange} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart data={data} dataKey="users" title="User Growth" />

        <AnalyticsChart
          data={data}
          dataKey="listings"
          title="Listings Growth"
        />

        <AnalyticsChart data={data} dataKey="swaps" title="Swaps Completed" />
      </div>
    </div>
  );
}
