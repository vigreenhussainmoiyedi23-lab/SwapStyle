// /admin/components/AnalyticsChart.jsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsChart({ data, dataKey, title }) {
  return (
    <div className="bg-surface p-5 rounded text-black">
      <h2 className="playfair text-xl mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />

          <XAxis dataKey="day" stroke="#2e3f59" />
          <YAxis stroke="#2e3f59" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#00d492"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}