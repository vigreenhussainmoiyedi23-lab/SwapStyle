import { listings } from "../data/mockData";

const AdminListings = () => {
  return (
    <div className="p-6 space-y-4">

      {listings.map(item => (
        <div key={item.id} className="bg-surface p-4 rounded-xl flex justify-between">

          <div>
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-sm text-text-muted">By {item.user}</p>
            <p className="text-sm">Condition: {item.condition}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold">₹{item.swapValue}</p>

            <button className="mt-2 px-3 py-1 bg-error text-white rounded">
              Remove
            </button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default AdminListings;