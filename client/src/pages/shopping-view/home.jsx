import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { getOrCreateGuestId, sortByCategoryOrder } from "@/lib/utils";
import { useSeo } from "@/lib/useSeo";
import { gtmAddToCart } from "@/lib/gtm";
import HeroSection from "@/components/shopping-view/hero-section";
import BestSellers from "@/components/shopping-view/best-sellers";
import WhyChoose from "@/components/shopping-view/why-choose";
import AboutWoodenHive from "@/components/shopping-view/about-woodenhive";

/* ================= IMAGE BASED CATEGORIES ================= */
const categories = [
  { id: "office", label: "Office", image: "/office.jpg" },
  { id: "kitchen", label: "Kitchen", image: "/kitchen.jpg" },
  { id: "gifts", label: "Gifts", image: "/gifts.jpg" },
  { id: "accessories", label: "Accessories", image: "/accessories.jpg" },
  { id: "home", label: "Home", image: "/home.jpg" },
];

function ShoppingHome() {
  useSeo({
    title: "Wooden Hive Pakistan | Handmade Wooden Furniture & Decor",
    description:
      "Shop handmade wooden furniture, decor and gifts crafted from Sheesham, Pine and other quality woods. Cash on Delivery available across Pakistan.",
  });
  const productList =
    useSelector((state) => state.shopProducts?.productList) || [];
  const productDetails =
    useSelector((state) => state.shopProducts?.productDetails) || null;
  const user = useSelector((state) => state.auth?.user) || null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  /* ================= HANDLERS ================= */
  function handleNavigateToListingPage(item, section) {
    sessionStorage.removeItem("activeFilter");
    navigate(`/shop/listing?${section}=${item.id}`);
  }

  

  function handleAddtoCart(productId) {
    const userId = user?.id || getOrCreateGuestId();

    dispatch(
      addToCart({
        userId,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(userId));
        toast({ title: "Product is added to cart" });
        // GTM: find product object from productList to get price/title
        const product = productList.find((p) => p._id === productId);
        if (product) gtmAddToCart({ product, quantity: 1, source: "home" });
      }
    });
  }

  /* ================= EFFECTS ================= */

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  /* ================= UI ================= */
  return (
    <div className="flex flex-col min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <HeroSection />

      {/* ================= CATEGORIES ================= */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((item) => (
              <Card
                key={item.id}
                onClick={() => handleNavigateToListingPage(item, "category")}
                className="group cursor-pointer overflow-hidden rounded-xl border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-36 w-full">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

                  <div className="absolute inset-0 flex items-end justify-center pb-4">
                    <span className="text-white text-lg font-semibold tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <BestSellers
        products={productList}
        handleAddtoCart={handleAddtoCart}
      />

      {/* ================= WHY CHOOSE WOODENHIVE ================= */}
      <WhyChoose />

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.length > 0 ? (
              sortByCategoryOrder(productList)
                .slice(0, 8)
                .map((product) => (
                  <ShoppingProductTile
                    key={product._id}
                    product={product}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
            ) : (
              <p className="col-span-full text-center">
                No Products Available
              </p>
            )}
          </div>

          {productList.length > 8 && (
            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                className="px-10"
                onClick={() => navigate("/shop/listing")}
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ================= ABOUT WOODENHIVE ================= */}
      <AboutWoodenHive />

      {/* Product details now open via route /shop/product/:id */}
    </div>
  );
}

export default ShoppingHome;
