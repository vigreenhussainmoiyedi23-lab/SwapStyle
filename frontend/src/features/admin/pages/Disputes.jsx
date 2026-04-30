import { disputes } from "../data/dummyData";

export default function Disputes() {
  return (
    <div>
      <h1 className="playfair text-3xl mb-6">Disputes</h1>

      <div className="bg-surface p-4 rounded text-black">
        {disputes.map(d => (
          <div key={d.id} className="p-4 border-b">
            <p className="montserrat font-semibold">{d.type}</p>
            <p>{d.reason}</p>
            <p className="text-sm text-gray-500">{d.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}