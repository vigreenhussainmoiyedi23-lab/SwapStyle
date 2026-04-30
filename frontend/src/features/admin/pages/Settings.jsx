export default function Settings() {
  return (
    <div>
      <h1 className="playfair text-3xl mb-6">Settings</h1>

      <div className="bg-surface p-6 rounded text-black max-w-md">
        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-2 border mb-3"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border mb-3"
        />

        <button className="bg-accent-500 text-brand-900 px-4 py-2 rounded source-code-pro">
          Change Password
        </button>
      </div>
    </div>
  );
}