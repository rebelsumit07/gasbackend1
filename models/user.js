import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }, // compulsory
  googleId: { type: String }, // stored for Google login
  password: { type: String }, // optional if Google login
});

const User = mongoose.model("User", userSchema);
export default User;
