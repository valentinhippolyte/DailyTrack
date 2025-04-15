// / modules import
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import habitRouter from "./routes/habit.js";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI not found in .env!");
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB works!"))
  .catch((error) => console.error(`MongoDB failed: ${error}`));
// Expess app creation
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // whatever origin
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization" // authorized headers
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS" // allowed methods
  );
  next(); //next middleware
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/habits", habitRouter);

export default app; // export the app  to server.js
