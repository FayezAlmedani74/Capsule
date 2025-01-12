const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    shareableLink: {
      type: String,
      unique: true,
    },
    image: String,
    isReleased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

capsuleSchema.index({ userId: 1, releaseDate: 1 });

module.exports = mongoose.model("Capsule", capsuleSchema);
