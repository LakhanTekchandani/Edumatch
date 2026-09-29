const mongoose = require("mongoose");

const reviewReportSchema = new mongoose.Schema(
    {
        reviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: true
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        reason: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["pending", "reviewed", "resolved", "dismissed"],
            default: "pending"
        },

        adminRemarks: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ReviewReport", reviewReportSchema);