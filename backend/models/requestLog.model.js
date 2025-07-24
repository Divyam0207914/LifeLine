import mongoose from "mongoose";


const requestLogSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toDonor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", required: true },
    bloodGroup: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("RequestLog", requestLogSchema);