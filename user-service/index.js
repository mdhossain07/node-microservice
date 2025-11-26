import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import connectDB from "./config/db.js";
import ApiError from "./utils/apiError.js";
import httpStatus from "http-status";
import { errorHandler } from "./utils/errorHandler.js";
dotenv.config();

try {
  const app = express();
  const port = process.env.PORT || 5000;

  // Middleware
  app.use(express.json());

  // database connection
  connectDB();

  app.get("/", (req, res) => {
    res.status(200).json({ messge: "Hello World" });
  });

  app.use("/v1", userRouter);

  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Route Not Found"));
  });

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (err) {
  console.log("Err: =", err);
}
