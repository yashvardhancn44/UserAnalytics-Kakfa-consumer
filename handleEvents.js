import { cacheData, updateBuyClicks, updateViews } from "./data.js";
import { broadcastUpdate } from "./webs.js";

const handleBuyClick = async (productId, timestamp) => {
  updateBuyClicks(productId);
  broadcastUpdate(cacheData[productId]);
};
const handleProductView = async (productId, timestamp, duration) => {
  updateViews(productId);
  broadcastUpdate(cacheData[productId]);
};

export { handleBuyClick, handleProductView };
