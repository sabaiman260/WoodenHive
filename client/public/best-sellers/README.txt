Best Sellers section images (landing page only)
==============================================

Put 4 images in THIS folder named:

    1.jpg
    2.jpg
    3.jpg
    4.jpg

Use styled / lifestyle photos (not plain white-background product shots).

Export all 4 as SQUARE images, 600 x 600 px. The tiles are square, so
600 x 600 sources fill them exactly with no cropping. Keep each under ~300 KB.

If you prefer .png or .webp, use that extension AND update the paths in:
    client/src/components/shopping-view/best-sellers.jsx  ->  BEST_SELLER_TILES

Each tile also has an `href` in that same file — set it to where the
image should link, e.g.:
    "/shop/listing"
    "/shop/listing?category=kitchen"
    "/shop/product/<product-slug>"

Until real files are added here, each tile falls back to /bg.jpg.
