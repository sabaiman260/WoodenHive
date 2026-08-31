import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

/**
 * Best Sellers: products the admin has flagged with `bestSeller` on the
 * product form. Renders nothing until at least one product is flagged.
 */
function BestSellers({ products, handleAddtoCart }) {
  const navigate = useNavigate();

  const items = (products || []).filter((p) => p?.bestSeller).slice(0, 8);

  if (items.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Best Sellers</h2>
          <p className="mt-2 text-muted-foreground">
            Customer favourites, hand-picked by our team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            className="px-10"
            onClick={() => navigate("/shop/listing")}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
