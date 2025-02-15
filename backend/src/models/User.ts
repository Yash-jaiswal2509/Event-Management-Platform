import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/models/User";

const userSchema = new mongoose.Schema<IUser>(  
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isGuest: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
