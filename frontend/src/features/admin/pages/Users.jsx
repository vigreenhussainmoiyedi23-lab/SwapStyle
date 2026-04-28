import { users } from "../data/mockData";

const Users = () => {
  return (
    <div className="p-6 space-y-4">

      {users.map(user => (
        <div key={user.id} className="bg-surface p-4 rounded-xl flex justify-between items-center">

          <div>
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-sm text-text-muted">{user.email}</p>
            <p className="text-sm">Location: {user.location}</p>
          </div>

          <div className="text-right">
            <p className="text-sm">
              Fraud Score:{" "}
              <span className={user.fraudScore > 60 ? "text-error" : "text-success"}>
                {user.fraudScore}
              </span>
            </p>

            <p className="text-sm">Swaps: {user.swaps}</p>

            <button className="mt-2 px-3 py-1 bg-accent-500 text-black rounded">
              View
            </button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default Users;