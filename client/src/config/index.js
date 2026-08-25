export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "e.g. Handmade Sheesham Wood Coffee Table - Solid Wooden Furniture",
    helpText:
      "Use a descriptive, SEO-friendly title: include wood type, product type and a key feature (e.g. handmade, solid wood).",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Describe the material, dimensions, finish, craftsmanship and ideal use (min. 40 characters)",
    helpText:
      "Write a complete description covering quality, wood type, dimensions and specifications so customers know exactly what they're buying.",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "office", label: "Office" },
      { id: "kitchen", label: "Kitchen" },
      { id: "gifts", label: "Gifts" },
      { id: "accessories", label: "Special Deals" },
      { id: "home", label: "Home & Decor" },
    ],
  },
  {
    label: "Actual Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter actual price",
  },
  {
    label: "Discounted Price (optional)",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter discounted price (optional)",
  },
  {
    label: "Size (single)",
    name: "size",
    componentType: "input",
    type: "text",
    placeholder: "Enter size (e.g. M)",
  },
  {
    label: "Colors (comma separated)",
    name: "colors",
    componentType: "input",
    type: "text",
    placeholder: "Enter colors separated by commas (e.g. red,green)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Wood Type",
    name: "woodType",
    componentType: "input",
    type: "text",
    placeholder: "e.g. Sheesham, Pine, Oak",
  },
  {
    label: "Dimensions (L x W x H)",
    name: "dimensions",
    componentType: "input",
    type: "text",
    placeholder: "e.g. 120cm x 60cm x 75cm",
  },
  {
    label: "Weight",
    name: "weight",
    componentType: "input",
    type: "text",
    placeholder: "e.g. 15kg",
  },
  {
    label: "Finish & Polish",
    name: "finish",
    componentType: "input",
    type: "text",
    placeholder: "e.g. Matte lacquer finish",
  },
  {
    label: "Care Instructions",
    name: "careInstructions",
    componentType: "textarea",
    placeholder: "e.g. Wipe with a dry cloth, avoid direct sunlight and moisture",
  },
  {
    label: "Delivery Time",
    name: "deliveryTime",
    componentType: "input",
    type: "text",
    placeholder: "e.g. 3-5 business days",
  },
  {
    label: "SEO Title (optional)",
    name: "metaTitle",
    componentType: "input",
    type: "text",
    placeholder: "e.g. Handmade Sheesham Wood Wall Clock | Wooden Hive Pakistan",
    helpText:
      "Overrides the browser tab title & search result title. Format: Descriptive Product Name | Wooden Hive Pakistan.",
  },
  {
    label: "SEO Keywords (optional, comma separated)",
    name: "metaKeywords",
    componentType: "input",
    type: "text",
    placeholder: "e.g. sheesham wood wall clock, wooden wall clock pakistan",
    helpText: "Keywords customers might search for on Google.",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home-page",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "All Products",
    path: "/shop/listing",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    path: "/shop/listing",
  },
  {
    id: "office",
    label: "Office",
    path: "/shop/listing",
  },
  {
    id: "home",
    label: "Home & Decor",
    path: "/shop/listing",
  },
  {
    id: "gifts",
    label: "Gifts",
    path: "/shop/listing",
  },
];

export const categoryOptionsMap = {
  office: "Office",
  kitchen: "Kitchen",
  gifts: "Gifts",
  accessories: "Special Deals",
  home: "Home & Decor",
};

// Display order for products grouped by category: Home, Office, Kitchen, Gifts, Accessories
export const categoryOrder = ["home", "office", "kitchen", "gifts", "accessories"];

export const filterOptions = {
  category: [
    { id: "all", label: "All" },
    { id: "office", label: "Office" },
    { id: "kitchen", label: "Kitchen" },
    { id: "gifts", label: "Gifts" },
    { id: "accessories", label: "Special Deals" },
    { id: "home", label: "Home & Decor" },
  ],
  price: [
    { id: "0-2000", label: "Under PKR 2,000" },
    { id: "2000-8000", label: "PKR 2,000 - PKR 8,000" },
    { id: "8000-16000", label: "PKR 8,000 - PKR 16,000" },
    { id: "16000+", label: "Above PKR 16,000" },
  ],
  woodType: [
    { id: "teak", label: "Teak" },
    { id: "sheesham", label: "Sheesham" },
    { id: "mango", label: "Mango" },
    { id: "acacia", label: "Acacia" },
    { id: "oak", label: "Oak" },
  ],
  bestSelling: [{ id: "true", label: "Best Selling" }],
};

export const sortOptions = [
  { id: "category-order", label: "Recommended" },
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
