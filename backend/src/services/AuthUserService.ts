import AuthUserRepository from "../repositories/AuthUserRepository";
import { IUser } from "../types/models/User";
import { IUserInput } from "../types/types";
import { generateToken } from "../utils/token";

class AuthUserService {
  async register(
    userData: IUserInput
  ): Promise<{ user: IUser; token: string }> {
    const existingUser = await AuthUserRepository.findByEmail(
      userData.email as string
    );
    if (existingUser) throw new Error("User already exists");

    const user = await AuthUserRepository.createUser(userData);
    const token = generateToken(user._id.toString());

    return { user, token };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const user = await AuthUserRepository.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id.toString());
    return { user, token };
  }

  async getAllUsers(): Promise<IUser[]> {
    return await AuthUserRepository.getAllUsers();
  }

  async findById(id: string): Promise<IUser | null> {
    return await AuthUserRepository.findById(id);
  }

  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await AuthUserRepository.update(id, updateData);
  }

  async delete(id: string): Promise<IUser | null> {
    return await AuthUserRepository.delete(id);
  }
}

export default new AuthUserService();
