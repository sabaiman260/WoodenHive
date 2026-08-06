// One-off migration: generate SEO-friendly slugs for products created before the slug field existed.
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const products = await Product.find({
    $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }],
  });

  console.log(`Found ${products.length} product(s) missing a slug.`);

  for (const product of products) {
    await product.save(); // pre-save hook generates the slug
    console.log(`${product._id} -> ${product.slug}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
