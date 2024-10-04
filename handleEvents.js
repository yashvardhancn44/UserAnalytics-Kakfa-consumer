import { cacheData, updateBuyClicks, updateViews } from "./data.js";
import { broadcastUpdate } from "./webs.js";
import { Product } from "./mongo.js";

const handleBuyClick = async (productId, timestamp) => {
  updateBuyClicks(productId);
  broadcastUpdate(cacheData[productId]);
  try {
    const result = await Product.findOneAndUpdate(
      { productId: productId },
      {
        $inc: { buyClicks: 1 },
        $push: { buyHistory: { timestamp: timestamp } },
      },
      { new: true }
    );
    if (result) {
      console.log(
        `Updated buyClicks for product: ${result.name} (ID: ${result.productId})`
      );
    } else {
      console.log(`Product with ID: ${productId} not found.`);
    }
  } catch (error) {
    console.error("Error updating buyClicks:", error);
  }
};
const handleProductView = async (productId, timestamp, duration) => {
  updateViews(productId);
  broadcastUpdate(cacheData[productId]);
  try {
    const result = await Product.findOneAndUpdate(
      { productId: productId },
      {
        $inc: { views: 1 },
        $push: { viewHistory: { timestamp: timestamp, duration: duration } },
      },
      { new: true }
    );
    if (result) {
      console.log(
        `Updated Views for product: ${result.name} (ID: ${result.productId})`
      );
    } else {
      console.log(`Product with ID: ${productId} not found.`);
    }
  } catch (error) {
    console.error("Error updating Views:", error);
  }
};

export { handleBuyClick, handleProductView };
