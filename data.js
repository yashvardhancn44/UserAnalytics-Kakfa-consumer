const cacheData = {};
import { Product } from "./mongo.js";

const loadData = async () => {
  const products = await Product.find({});

  products.forEach((product) => {
    cacheData[product.productId] = {
      productId: product.productId,
      name: product.name,
      buyClicks: product.buyClicks,
      views: product.views,
    };
  });

  console.log(cacheData);
};

const updateBuyClicks = (id) => {
  // console.log(` before: ${cacheData[id].buyClicks}`);
  if (id === undefined) {
    cacheData[id].buyClicks = cacheData[id].buyClicks + 0;
    return;
  }
  cacheData[id].buyClicks++;
  console.log(` after: ${cacheData[id].buyClicks}`);
};

const updateViews = (id) => {
  console.log(` before: ${cacheData[id].views}`);
  cacheData[id].views++;
  console.log(` after: ${cacheData[id].views}`);
};

export { loadData, updateBuyClicks, updateViews, cacheData };
