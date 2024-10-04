import mongoose from "mongoose";
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

export const Product = mongoose.model("Product", ProductSchema);
