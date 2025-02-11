// Interacts with the service layer only and the request and response objects for the HTTP requests and responses from frontend

import { Request, Response } from "express";
import AuthUserService from "../services/AuthUserService";

class AuthUserController {
  // Register
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const { user, token } = await AuthUserService.register({
        username,
        email,
        password,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
          token,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      });
    }
  }

  // Login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthUserService.login(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
          token,
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      });
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await AuthUserService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get users",
      });
    }
  }

  // Get user by id
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await AuthUserService.findById(id);
      if (!user) {
        res.status(404).json({
          success: false,
          error: "User not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get user",
      });
    }
  }

  // Update user
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const user = await AuthUserService.update(id, {
        username,
        email,
        password,
      });
      if (!user) {
        res.status(404).json({
          success: false,
          error: "User not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to update user",
      });
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await AuthUserService.delete(id);
      if (!user) {
        res.status(404).json({
          success: false,
          error: "User not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete user",
      });
    }
  }

  // Logout
  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token");
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to logout",
      });
    }
  }
}

export default new AuthUserController();
