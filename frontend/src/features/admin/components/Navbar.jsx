export default function Navbar() {
  return (
    <div className="bg-brand-800 p-4 flex justify-between items-center">
      <h2 className="playfair text-xl">Admin Dashboard</h2>

      <button className="bg-accent-500 text-brand-900 px-4 py-2 rounded source-code-pro">
        Logout
      </button>
    </div>
  );
}