import { Router } from "express";
import AuthUserController from "../controllers/AuthUserController";
import { protect } from "../middleware/auhtMiddleware";

const router = Router();

router.post("/register", AuthUserController.register);
router.post("/login", AuthUserController.login);
router.get("/logout", AuthUserController.logout);
router.get("/users", protect, AuthUserController.getAllUsers);
router.get("/users/:id", protect, AuthUserController.getUserById);
router.put("/users/:id", protect, AuthUserController.updateUser);
router.delete("/users/:id", protect, AuthUserController.deleteUser);

export default router;
