import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  location: String,
  recipientName: String,
  bloodGroup: String,
});

export default mongoose.model("Donation", donationSchema);
