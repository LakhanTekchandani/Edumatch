const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        instituteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institute",
            required: true
        },

        ratings: {
            facultyQuality: {
                type: Number,
                required: true
            },

            studyMaterial: {
                type: Number,
                required: true
            },

            feeTransparency: {
                type: Number,
                required: true
            },

            batchManagement: {
                type: Number,
                required: true
            }
        },

        comment: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

reviewSchema.index(
    { studentId: 1, instituteId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);