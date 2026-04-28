import StatCard from "../components/StatCard";
import { users, listings, disputes } from "../data/mockData";

const AdminHome = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

      <StatCard title="Total Users" value={users.length} />
      <StatCard title="Total Listings" value={listings.length} />
      <StatCard title="Open Disputes" value={disputes.length} />

      <StatCard title="Active Users" value={users.filter(u => u.status === "active").length} />
      <StatCard title="Flagged Users" value={users.filter(u => u.status === "flagged").length} />
      <StatCard title="Total Swaps" value={12} />

    </div>
  );
};

export default AdminHome;