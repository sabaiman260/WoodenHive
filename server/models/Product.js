const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // support multiple images while keeping `image` for backward compatibility
    images: [String],
    image: String,
    title: String,
    description: String,
    category: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    size: String,
    colors: [String],
    averageReview: Number,
    woodType: String,
    dimensions: String,
    weight: String,
    finish: String,
    careInstructions: String,
    deliveryTime: String,
    metaTitle: String,
    metaKeywords: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
