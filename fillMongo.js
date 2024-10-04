import mongoose from "mongoose";
import { Product } from "./mongo.js"; // Assuming the schema is defined in mongo.js

// Dummy data to insert
const initialProducts = [
  {
    productId: 1,
    name: "Product 1",
    buyClicks: 10,
    views: 50,
    viewHistory: [
      { timestamp: "2024-10-01T10:00:00Z", duration: 3000 },
      { timestamp: "2024-10-02T12:30:00Z", duration: 4000 },
    ],
    buyHistory: [
      { timestamp: "2024-10-01T12:00:00Z" },
      { timestamp: "2024-10-03T09:30:00Z" },
    ],
  },
  {
    productId: 2,
    name: "Product 2",
    buyClicks: 5,
    views: 25,
    viewHistory: [
      { timestamp: "2024-10-01T11:00:00Z", duration: 2500 },
      { timestamp: "2024-10-03T14:15:00Z", duration: 3700 },
    ],
    buyHistory: [{ timestamp: "2024-10-01T13:45:00Z" }],
  },
  {
    productId: 3,
    name: "Product 3",
    buyClicks: 0,
    views: 10,
    viewHistory: [{ timestamp: "2024-10-02T10:45:00Z", duration: 3000 }],
    buyHistory: [],
  },
  {
    productId: 4,
    name: "Product 4",
    buyClicks: 20,
    views: 80,
    viewHistory: [
      { timestamp: "2024-10-01T15:00:00Z", duration: 4500 },
      { timestamp: "2024-10-03T12:10:00Z", duration: 5000 },
    ],
    buyHistory: [
      { timestamp: "2024-10-02T16:30:00Z" },
      { timestamp: "2024-10-03T17:45:00Z" },
    ],
  },
  {
    productId: 5,
    name: "Product 5",
    buyClicks: 15,
    views: 60,
    viewHistory: [
      { timestamp: "2024-10-02T11:00:00Z", duration: 3200 },
      { timestamp: "2024-10-04T09:45:00Z", duration: 4700 },
    ],
    buyHistory: [{ timestamp: "2024-10-02T13:00:00Z" }],
  },
  {
    productId: 6,
    name: "Product 6",
    buyClicks: 7,
    views: 35,
    viewHistory: [
      { timestamp: "2024-10-01T17:20:00Z", duration: 3000 },
      { timestamp: "2024-10-02T12:45:00Z", duration: 4000 },
    ],
    buyHistory: [{ timestamp: "2024-10-02T14:00:00Z" }],
  },
  {
    productId: 7,
    name: "Product 7",
    buyClicks: 3,
    views: 15,
    viewHistory: [{ timestamp: "2024-10-01T16:00:00Z", duration: 2000 }],
    buyHistory: [{ timestamp: "2024-10-01T17:30:00Z" }],
  },
  {
    productId: 8,
    name: "Product 8",
    buyClicks: 9,
    views: 45,
    viewHistory: [
      { timestamp: "2024-10-02T08:00:00Z", duration: 3300 },
      { timestamp: "2024-10-03T09:00:00Z", duration: 4100 },
    ],
    buyHistory: [{ timestamp: "2024-10-02T10:15:00Z" }],
  },
  {
    productId: 9,
    name: "Product 9",
    buyClicks: 6,
    views: 20,
    viewHistory: [
      { timestamp: "2024-10-01T14:30:00Z", duration: 2600 },
      { timestamp: "2024-10-02T16:45:00Z", duration: 3000 },
    ],
    buyHistory: [{ timestamp: "2024-10-01T15:30:00Z" }],
  },
  {
    productId: 10,
    name: "Product 10",
    buyClicks: 12,
    views: 55,
    viewHistory: [{ timestamp: "2024-10-03T11:00:00Z", duration: 5000 }],
    buyHistory: [{ timestamp: "2024-10-03T12:30:00Z" }],
  },
];

// Function to insert the dummy data into MongoDB
const insertData = async () => {
  try {
    for (const product of initialProducts) {
      const existingProduct = await Product.findOne({
        productId: product.productId,
      });
      if (!existingProduct) {
        await Product.create(product);
        console.log(
          `Inserted product: ${product.name} (ID: ${product.productId})`
        );
      } else {
        console.log(
          `Product already exists: ${product.name} (ID: ${product.productId})`
        );
      }
    }
    console.log("Data insertion complete.");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Run the data insertion
insertData();
