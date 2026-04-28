import { disputes } from "../data/mockData";

const Disputes = () => {
  return (
    <div className="p-6 space-y-4">

      {disputes.map(d => (
        <div key={d.id} className="bg-surface p-4 rounded-xl">

          <h2 className="font-bold">Swap ID: {d.swapId}</h2>
          <p className="text-sm text-text-muted">{d.reason}</p>

          <p className="text-sm mt-2">
            Users: {d.users.join(" vs ")}
          </p>

          <div className="flex gap-2 mt-3">
            <button className="px-3 py-1 bg-success text-white rounded">
              Resolve
            </button>
            <button className="px-3 py-1 bg-error text-white rounded">
              Reject
            </button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default Disputes;