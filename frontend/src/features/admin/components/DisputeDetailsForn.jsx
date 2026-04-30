export default function DisputeDetail({ dispute }) {
  return (
    <div className="bg-surface p-6 rounded text-black">
      <h2 className="playfair text-xl mb-4">Resolve Dispute</h2>

      <select className="w-full p-2 border mb-3">
        <option>FAVOR_REQUESTER</option>
        <option>FAVOR_OWNER</option>
        <option>REFUND</option>
        <option>CANCEL_SWAP</option>
      </select>

      <textarea
        placeholder="Reason..."
        className="w-full p-2 border mb-3"
      />

      <button className="bg-accent-500 text-brand-900 px-4 py-2 source-code-pro rounded">
        Submit Resolution
      </button>
    </div>
  );
}