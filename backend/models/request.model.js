// models/request.model.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    name: String,
    contact: String,
    location: String,
    bloodGroup: String,
    message: String,
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
