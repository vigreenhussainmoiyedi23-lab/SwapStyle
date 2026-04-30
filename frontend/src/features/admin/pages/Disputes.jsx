import { useEffect } from "react";
import useAdmin from "../hooks/useAdmin";
import Button from "../components/Button";

export default function Disputes() {
  const { GetAllDisputesHandler, disputes, loading, ResolveDisputeHandler } =
    useAdmin();
  useEffect(() => {
    GetAllDisputesHandler();
  }, []);

  if (loading)
    return (
      <div className="bg-brand-900 text-5xl flex items-center justify-center animate-pulse min-h-screen w-full text-white ">
        loading...
      </div>
    );
  console.log(disputes);
  return (
    <div>
      <h1 className="playfair text-3xl mb-6">Disputes</h1>

      <div className="bg-brand-800 p-4 rounded text-black flex flex-col gap-3">
        {disputes.map((d) => (
          <div key={d.id} className="p-4 bg-accent-500 border-b rounded-lg flex items-center justify-between">
            <div>
              <p className="montserrat font-semibold">{d.type}</p>
              <p>{d.reason}</p>
              <p className="text-sm text-gray-500">{d.status}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                resolve
              </Button>
              <Button variant="danger">
                reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
