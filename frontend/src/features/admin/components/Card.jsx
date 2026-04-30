const StatCard = ({ title, value }) => {
  return (
    <div className="bg-surface p-4 rounded-xl shadow">
      <p className="text-text-muted text-sm">{title}</p>
      <h2 className="text-xl font-bold text-text-primary">{value}</h2>
    </div>
  );
};

export default StatCard;