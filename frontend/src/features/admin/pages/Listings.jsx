import { listings } from "../data/dummyData";
import Button from "../components/Button";

export default function Listings() {
  return (
    <div>
      <h1 className="playfair text-3xl mb-6">Listings</h1>

      <div className="bg-surface p-4 rounded text-black">
        {listings.map(list => (
          <div key={list.id} className="flex justify-between p-3 border-b">
            <div>
              <p className="montserrat">{list.title}</p>
              <p className="text-sm">{list.category}</p>
            </div>

            <Button variant="danger">Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}