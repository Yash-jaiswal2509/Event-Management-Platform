import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthUserService from "../services/AuthUserService";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: "Not authorized to access this route",
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await AuthUserService.findById(decoded.id);

      if (!user) {
        res.status(401).json({
          success: false,
          error: "User not found",
        });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        error: "Not authorized to access this route",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
};
