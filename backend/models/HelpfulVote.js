const mongoose = require("mongoose");

const helpfulVoteSchema = new mongoose.Schema(
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

        isHelpful: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

helpfulVoteSchema.index(
    { studentId: 1, reviewId: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "HelpfulVote",
    helpfulVoteSchema
);