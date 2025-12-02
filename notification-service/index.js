import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectQueue } from "./config/queue.js";
import { getNotification } from "./service/notification.service.js";

try {
  const app = express();
  const port = process.env.PORT || 5003;

  // middleware
  app.use(express.json());

  // queue connection
  connectQueue();

  // queue consumer
  getNotification();

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.listen(port, () => {
    console.log(`Notification service running on port ${port}`);
  });
} catch (err) {
  console.error(err);
}
