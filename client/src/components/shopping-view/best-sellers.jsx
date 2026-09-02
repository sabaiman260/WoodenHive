import { useNavigate } from "react-router-dom";

/*
 * Curated images for the Best Sellers grid — LANDING PAGE ONLY.
 *
 * Add your images inside:
 * client/public/best-sellers/
 *
 * Files:
 * 1.jpg
 * 2.jpg
 * 3.jpg
 * 4.jpg
 */

const BEST_SELLER_TILES = [
  {
    image: "/best-sellers/1.jpg",
    alt: "Best seller",
    href: "/shop/product/wooden-foot-massage-roller",
  },
  {
    image: "/best-sellers/2.jpg",
    alt: "Best seller",
    href: "/shop/product/handcrafted-islamic-calligraphy-carved-wooden-wall-art",
  },
  {
    image: "/best-sellers/3.jpg",
    alt: "Best seller",
    href: "/shop/product/handcrafted-wooden-apple-coaster-set",
  },
  {
    image: "/best-sellers/4.jpg",
    alt: "Best seller",
    href: "/shop/product/handcrafted-wooden-ghaman-glass",
  },
];

function BestSellers() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Best Sellers
          </h2>
        </div>

        {/* 2 Rows × 2 Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {BEST_SELLER_TILES.map((tile, index) => (
            <button
              key={index}
              type="button"
              onClick={() => navigate(tile.href)}
              className="group block w-full overflow-hidden border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
              aria-label={tile.alt}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={tile.image}
                  alt={tile.alt}
                  className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/bg.jpg";
                  }}
                />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BestSellers;
