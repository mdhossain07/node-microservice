import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/database.js";
import taskRoutes from "./routes/task.route.js";
import { connectQueue } from "./config/queue.js";

try {
  const app = express();
  const port = process.env.PORT || 5002;

  // Middleware
  app.use(express.json());

  // database connection
  connectDB();

  // queue connection
  connectQueue();

  app.get("/", (req, res) => {
    res.status(200).json({ messge: "Hello World" });
  });

  // routes
  app.use("/v1", taskRoutes);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (err) {
  console.log("Err: =", err);
}
