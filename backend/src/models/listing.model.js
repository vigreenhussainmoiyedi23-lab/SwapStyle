const mongoose = require("mongoose");
const { CLOTHING_TYPES, SIZES, CONDITIONS, CATEGORIES } = require("../constants/listingEnums");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    clothingType: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const validTypes = CLOTHING_TYPES[this.category];
                return validTypes?.includes(value);
            },
            message: "Invalid clothing type for selected category"
        }
    },
    Location: {
        lat: Number,//latitude
        log: Number,//longitude
        city: String,
        State: String
    },
    brandName: {
        type: String,
        required: true
    },

    size: {
        type: String,
        enum: SIZES,
        required: true
    },

    condition: {
        type: String,
        enum: CONDITIONS,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: CATEGORIES
    },

    estimatedValue: {
        type: Number,
        min: 1,
        max: 1000
    },

    images: [{
        type: {
            url: {
                type: String,
                required: [true, "Image url is required"]
            },
            fileId: {
                type: String,
                required: [true, "Image fileId is required"]
            },
        },
        required: [true, "At least one image is required"]
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },


}, { timestamps: true });

listingSchema.index({ owner: 1, createdAt: -1 }); // Compound index for efficient user listing retrieval
const listingModel = mongoose.model("listing", listingSchema)

module.exports = listingModel;