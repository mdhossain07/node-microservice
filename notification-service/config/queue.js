import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

export async function connectQueue() {
  const maxRetries = 5;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const connectionUrl = process.env.RABBITMQ_CONNECTION_URI;

  while (maxRetries) {
    try {
      const connection = await amqp.connect(connectionUrl);
      const channel = await connection.createChannel();
      console.log("RabbitMQ connected!");
      return channel;
    } catch (err) {
      console.error(`RabbitMQ connect error: ${err.message}`);
      await delay(5000);
    }
  }
}
