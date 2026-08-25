import ProductFilter from "@/components/shopping-view/filter";
// Product details will open via route, not modal
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrCreateGuestId, sortByCategoryOrder } from "@/lib/utils";
import { gtmAddToCart } from "@/lib/gtm";

const FILTER_SECTIONS = ["category", "price", "woodType", "bestSelling"];

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [sort, setSort] = useState("category-order");
  const [searchParams, setSearchParams] = useSearchParams();

  const { toast } = useToast();

  // The URL is the single source of truth for the active filter, so there is
  // no separate state to fall out of sync with it.
  const activeFilter = useMemo(() => {
    for (const section of FILTER_SECTIONS) {
      const value = searchParams.get(section);
      if (value) return { section, value };
    }
    return null;
  }, [searchParams]);

  // On first load with no filter in the URL, restore the last filter the
  // user had selected (if any) by writing it into the URL once.
  useEffect(() => {
    if (activeFilter) return;
    const stored = JSON.parse(sessionStorage.getItem("activeFilter") || "null");
    if (stored?.section && stored?.value) {
      setSearchParams(
        new URLSearchParams(`${stored.section}=${encodeURIComponent(stored.value)}`)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    if (!getSectionId || !getCurrentOption) return;

    const currentlySelected =
      activeFilter?.section === getSectionId && activeFilter?.value === getCurrentOption;

    if (currentlySelected) {
      setSearchParams(new URLSearchParams());
      sessionStorage.removeItem("activeFilter");
    } else {
      setSearchParams(
        new URLSearchParams(`${getSectionId}=${encodeURIComponent(getCurrentOption)}`)
      );
      sessionStorage.setItem(
        "activeFilter",
        JSON.stringify({ section: getSectionId, value: getCurrentOption })
      );
    }
  }

  

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log("Add to cart clicked for product:", getCurrentProductId);
    console.log("Current cart items:", cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    const userId = user?.id || getOrCreateGuestId();
    console.log("Using userId:", userId);

    dispatch(
      addToCart({
        userId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      console.log("Add to cart response:", data);
      if (data?.payload?.success) {
        dispatch(fetchCartItems(userId));
        toast({
          title: "Product is added to cart",
        });
        // GTM: find the product object from productList
        const product = productList?.find((p) => p._id === getCurrentProductId);
        if (product) gtmAddToCart({ product, quantity: 1, source: "listing" });
      } else {
        console.error("Failed to add to cart:", data);
        toast({
          title: "Failed to add product to cart",
          variant: "destructive",
        });
      }
    }).catch((error) => {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error adding product to cart",
        variant: "destructive",
      });
    });
  }

  useEffect(() => {
    if (sort !== null) {
      const isAllCategory =
        activeFilter?.section === "category" && activeFilter?.value === "all";
      const filterParams =
        activeFilter && !isAllCategory
          ? { [activeFilter.section]: [activeFilter.value] }
          : {};
      dispatch(
        fetchAllFilteredProducts({
          filterParams,
          sortParams: sort === "category-order" ? "price-lowtohigh" : sort,
        })
      );
    }
  }, [dispatch, sort, activeFilter]);

  

  console.log(productList, "productListproductListproductList");
  // Apply additional client-side filter logic locally.
  function applyClientSideFilters(list) {
    if (!list || list.length === 0) return [];

    let result = [...list];

    if (activeFilter?.section === "price") {
      const range = activeFilter.value;
      result = result.filter((p) => {
        const price = p?.salePrice || p?.price || 0;
        if (range === "0-2000") return price < 2000;
        if (range === "2000-8000") return price >= 2000 && price <= 8000;
        if (range === "8000-16000") return price > 8000 && price <= 16000;
        if (range === "16000+") return price > 16000;
        return true;
      });
    }

    if (activeFilter?.section === "woodType") {
      const type = activeFilter.value.toLowerCase();
      result = result.filter((p) => {
        const explicit = (p.woodType || p.material || "").toString().toLowerCase();
        const title = (p.title || "").toString().toLowerCase();
        const description = (p.description || "").toString().toLowerCase();
        return (
          explicit.includes(type) ||
          title.includes(type) ||
          description.includes(type)
        );
      });
    }

    // Best Selling: show highest-rated products first
    if (activeFilter?.section === "bestSelling") {
      result = [...result]
        .filter((p) => (p.averageReview || 0) > 0)
        .sort((a, b) => (b.averageReview || 0) - (a.averageReview || 0));
    }

    if (sort === "category-order" && activeFilter?.section !== "bestSelling") {
      result = sortByCategoryOrder(result);
    }

    return result;
  }

  const displayedProducts = applyClientSideFilters(productList);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter activeFilter={activeFilter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {displayedProducts?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {displayedProducts && displayedProducts.length > 0
            ? displayedProducts.map((productItem) => (
                <ShoppingProductTile
                  key={productItem?._id || productItem?.id || productItem?.title}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      {/* Product details now open via route /shop/product/:id */}
    </div>
  );
}

export default ShoppingListing;
