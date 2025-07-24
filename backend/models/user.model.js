import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      // Array of roles to allow multiple roles
      type: [String],
      enum: ["donor", "requester", "admin"],
      default: ["requester"], // new users start as requester
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
