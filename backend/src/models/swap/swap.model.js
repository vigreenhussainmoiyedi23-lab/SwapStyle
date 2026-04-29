const mongoose = require("mongoose")


const swapSchema = new mongoose.Schema({
  // requester offers a listing
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  requesterListing: { type: mongoose.Schema.Types.ObjectId, ref: "listing" },

  // owner has a listing for which requester requests
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  ownerListing: { type: mongoose.Schema.Types.ObjectId, ref: "listing" },

  message: String,
  status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "prepared_to_ship",
      "shipping",
      "disputed",
      "completed",
      "rejected",
      "cancelled"
    ]
  },
  shipments: [{
    from: {
      type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    courier: String,
    trackingId: String,
  }],
  ownerAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: Number,
  },
  requesterAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: Number,
  },
  shipment_type: {
    type: String,
    enum: ["local_swap", "shipping"],
    default: "shipping"
  },
  completedBy: {
    requester: { type: Boolean, default: false },
    owner: { type: Boolean, default: false }
  },
  shippedBy: {
    requester: { type: Boolean, default: false },
    owner: { type: Boolean, default: false }
  },
  AddresGivenBy: {
    requester: { type: Boolean, default: false },
    owner: { type: Boolean, default: false }
  },
  changeHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChangeHistory"
  }]
}, { timestamps: true });

module.exports = mongoose.model("Swap", swapSchema);