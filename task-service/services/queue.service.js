import { connectQueue } from "../config/queue.js";

class QueueService {
  publishTaskWithRetry = async (queue, data, attempt = 0) => {
    if (attempt > 5) {
      console.log("Max retry attempts reached");
      return;
    }

    try {
      const channel = await connectQueue();
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
      console.log(`Task published to ${queue}`);
    } catch (error) {
      console.error(`Failed to publish task to ${queue}:`, error);
      attempt++;
      setTimeout(() => {
        this.publishTaskWithRetry(queue, data, attempt);
      }, 5000);
    }
  };
}

export default new QueueService();
