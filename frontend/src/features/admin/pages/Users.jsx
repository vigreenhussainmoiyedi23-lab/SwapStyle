import { users } from "../data/dummyData";
import Button from "../components/Button";

export default function Users() {
  return (
    <div>
      <h1 className="playfair text-3xl mb-6">Users</h1>

      <div className="bg-surface p-4 rounded text-black">
        {users.map(user => (
          <div key={user.id} className="flex justify-between p-3 border-b">
            <div>
              <p className="montserrat">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <Button variant={user.isBanned ? "secondary" : "danger"}>
              {user.isBanned ? "Unban" : "Ban"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}