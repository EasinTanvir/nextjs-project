import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verifyToken: String,
  verifyTokenExpire: Date,
});

const USER = mongoose.models.users || mongoose.model("users", userSchema);
export default USER;
