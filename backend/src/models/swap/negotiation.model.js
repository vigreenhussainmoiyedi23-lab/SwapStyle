const mongoose = require("mongoose");


const negotiationSchema = new mongoose.Schema({
    swapId: ObjectId,   // 🔥 important (reference)
    sender: ObjectId,
    text: String,
    isEdited: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

negotiationSchema.index({ swapId: 1, sender: 1 }, { unique: true })
const negotiationModel = mongoose.model("negotiations", negotiationSchema, "negotiations")
module.exports = negotiationModel