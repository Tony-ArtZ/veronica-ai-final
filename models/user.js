import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  userName: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};
export const User = mongoose.model("users", userSchema);
