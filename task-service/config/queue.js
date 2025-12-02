import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

export async function connectQueue(retries = 0) {
  const connectionUrl = process.env.RABBITMQ_CONNECTION_URI;

  try {
    const connection = await amqp.connect(connectionUrl);
    const channel = await connection.createChannel();
    console.log("RabbitMQ connected!");
    return channel;
  } catch (err) {
    console.error(`RabbitMQ connect error: ${err.message}`);
    if (retries < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
      return connectQueue(retries + 1);
    } else {
      throw new Error("RabbitMQ connection failed after maximum retries");
    }
  }
}
