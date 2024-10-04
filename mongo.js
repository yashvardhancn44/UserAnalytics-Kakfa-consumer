import mongoose from "mongoose";
import { loadData } from "./data.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProductSchema = new mongoose.Schema({
  productId: { type: Number, required: true, index: true },
  name: String,
  buyClicks: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  viewHistory: [{ timestamp: Date, duration: Number }],
  buyHistory: [{ timestamp: Date }],
});

async function clearProductAnalytics() {
  try {
    const result = await Product.updateMany(
      {},
      {
        $set: {
          buyClicks: 0,
          views: 0,
          viewHistory: [],
          buyHistory: [],
        },
      }
    );

    console.log(
      `Successfully cleared analytics for ${result.modifiedCount} products.`
    );
    await loadData();
  } catch (error) {
    console.error("Error clearing product analytics:", error);
  }
}

const Product = mongoose.model("Product", ProductSchema);
export { Product, clearProductAnalytics };
