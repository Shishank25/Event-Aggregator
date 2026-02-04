import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    venue: String,
    address: String,
    city: { type: String, default: "Sydney" },

    imageUrl: String,
    category: [String],

    source: String,
    originalUrl: {
      type: String,
      unique: true,
    },


    status: {
      type: [String],
      enum: ["new", "updated", "inactive", "imported"],
      default: ["new"],
    },

    lastScrapedAt: Date,

    importedAt: Date,
    importedBy: String,
    importNotes: String,

    hash: String,
  },
  { timestamps: true }
);

eventSchema.index({ city: 1, date: 1, status: 1 });

export default mongoose.model("Event", eventSchema);
