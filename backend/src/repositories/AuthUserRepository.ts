// Interacts with the database only

import User from "../models/User";
import { IUser } from "../types/models/User";
import { IUserInput } from "../types/types";

class AuthUserRepository {
  async createUser(userData: IUserInput): Promise<IUser> {
    return await User.create(userData);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find().select("-password");
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("-password");
  }

  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
  }

  async delete(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export default new AuthUserRepository();
