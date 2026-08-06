const mongoose = require("mongoose");

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ProductSchema = new mongoose.Schema(
  {
    // SEO-friendly URL identifier, derived from title
    slug: { type: String, unique: true, sparse: true },
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

ProductSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    const base = slugify(this.title) || "product";
    let candidate = base;
    let counter = 1;
    const Product = this.constructor;
    while (await Product.exists({ slug: candidate, _id: { $ne: this._id } })) {
      candidate = `${base}-${counter++}`;
    }
    this.slug = candidate;
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
