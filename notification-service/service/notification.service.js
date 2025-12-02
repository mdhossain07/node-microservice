import { connectQueue } from "../config/queue.js";

export const getNotification = async () => {
  try {
    const channel = await connectQueue();

    channel.assertQueue("task_queue", { durable: true });
    console.log("Notification service is listening to messages");

    channel.consume("task_queue", (msg) => {
      const taskData = JSON.parse(msg.content.toString());
      console.log("Notification service received message", taskData);
      channel.ack(msg);
    });
  } catch (err) {
    console.error(err);
  }
};
