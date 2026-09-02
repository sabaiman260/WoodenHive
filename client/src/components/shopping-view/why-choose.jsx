const FEATURES = [
  {
    num: "01",
    title: "Premium Sheesham Wood",
    text: "Solid, sustainably sourced timber with natural grain and lasting strength.",
  },
  {
    num: "02",
    title: "Handcrafted by Artisans",
    text: "Every piece is shaped and finished by skilled Pakistani craftsmen.",
  },
  {
    num: "03",
    title: "Cash on Delivery",
    text: "Pay when it arrives, with reliable delivery across Pakistan.",
  },
  {
    num: "04",
    title: "Warranty & Care",
    text: "Backed by after-sales support and easy care guidance.",
  },
];

function WhyChoose() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left: heading + numbered features */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Craftsmanship, quality and service that make every Wooden Hive
              piece worth bringing home.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {FEATURES.map(({ num, title, text }) => (
                <div key={num}>
                  <span className="block text-3xl font-bold text-primary">
                    {num}
                  </span>
                  <div className="mt-3 h-px w-8 bg-primary/30" />
                  <h3 className="mt-3 text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image with an offset outline frame for depth */}
          <div className="relative">
            <div
              className="absolute -bottom-6 -left-6 hidden h-full w-full border border-gray-300 lg:block"
              aria-hidden="true"
            />
            <img
              src="/w6.jpg"
              alt="Handcrafted wooden furniture by Wooden Hive"
              className="relative h-[420px] w-full border border-gray-200 bg-white object-cover md:h-[520px]"
              onError={(e) => {
                e.currentTarget.src = "/bg.jpg";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
