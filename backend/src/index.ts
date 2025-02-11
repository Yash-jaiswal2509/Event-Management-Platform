import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
