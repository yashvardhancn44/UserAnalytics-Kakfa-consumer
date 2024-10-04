import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initKafkaConsumer, consumeMessages } from "./kafka.js";
import { Product, clearProductAnalytics } from "./mongo.js";
import { loadData, cacheData } from "./data.js";
import { startWebsocket } from "./webs.js";

dotenv.config();
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  res.json(Object.values(cacheData));
});

app.post("/api/reset", async (req, res) => {
  await clearProductAnalytics();
  res.json(Object.values(cacheData));
});

const startServer = async () => {
  await loadData();
  startWebsocket();
  await initKafkaConsumer();
  consumeMessages();
  app.listen(PORT, () => {
    console.log(`Server is running on Port 3000`);
  });
};

startServer();
