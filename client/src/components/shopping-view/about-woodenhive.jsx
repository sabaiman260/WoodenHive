import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIGHLIGHTS = [
  "Timeless Sheesham wood handicrafts made in Pakistan",
  "Skilled artisans, traditional techniques, modern design",
  "Natural grain, warmth and character in every piece",
];

const STATS = [
  { value: "100%", label: "Sheesham Wood" },
  { value: "Handmade", label: "By Local Artisans" },
  { value: "Pakistan", label: "Proudly Crafted In" },
];

function AboutWoodenHive() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image with an offset outline frame for depth */}
          <div className="relative">
            <div
              className="absolute -bottom-6 -right-6 hidden h-full w-full border border-gray-300 lg:block"
              aria-hidden="true"
            />
            <img
              src="/w4.jpg"
              alt="Handcrafted wooden pieces by Wooden Hive"
              className="relative h-[420px] w-full border border-gray-200 bg-white object-cover md:h-[520px]"
              onError={(e) => {
                e.currentTarget.src = "/bg.jpg";
              }}
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                About Wooden Hive
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
              Bringing nature home, one handmade piece at a time
            </h2>

            <p className="mt-5 leading-relaxed text-muted-foreground">
              At Wooden Hive we craft timeless Sheesham wood handicrafts in
              Pakistan. Every product is shaped by skilled local artisans and
              carries the natural grain, warmth and character of real wood —
              made to last and to feel at home in any space.
            </p>

            <ul className="mt-8 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-3 divide-x divide-gray-200 border-y border-gray-200">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-3 py-5 text-center">
                  <div className="text-lg font-bold text-primary md:text-xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-10 px-8"
              onClick={() => navigate("/shop/listing")}
            >
              Explore the Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutWoodenHive;
