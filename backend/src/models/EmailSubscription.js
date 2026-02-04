import mongoose from "mongoose";

const emailSubscriptionSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    consent: { type: Boolean, required: true },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "EmailSubscription",
  emailSubscriptionSchema
);
