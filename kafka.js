import { Kafka } from "kafkajs";
import { handleBuyClick, handleProductView } from "./handleEvents.js";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "my-consumer-app",
  brokers: [process.env.CONFLUENT_CLOUD_BROKER],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.CONFLUENT_CLOUD_API_KEY,
    password: process.env.CONFLUENT_CLOUD_API_SECRET,
  },
});

const consumer = kafka.consumer({ groupId: "test-group-new" });
// export const consumer = kafka.consumer({ groupId: "dashboard-group" });

const initKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "test-buy-clicks-topic",
    fromBeginning: true,
  });
  await consumer.subscribe({
    topic: "test-product-views-topic",
    fromBeginning: true,
  });
};

async function consumeMessages() {
  console.log("messages consuming started");
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());
      // console.log(value);
      const { eventType } = value;
      // console.log(eventType);

      if (eventType === "buy-click") {
        const { productId, eventType, timestamp, userId } = value;
        console.log(`${productId}, ${eventType}`);
        // console.log(value);
        await handleBuyClick(productId, timestamp);
      } else if (eventType === "product-view") {
        const { productId, eventType, timestamp, duration, userId } = value;
        console.log(`${productId}, ${eventType}`);
        // console.log(value);
        if (value && productId !== undefined) {
          await handleProductView(productId, timestamp, duration);
        } else {
          console.error("Invalid message structure:", value);
        }
      }
    },
  });
}

export { consumeMessages, initKafkaConsumer };
