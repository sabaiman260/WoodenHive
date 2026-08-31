import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIGHLIGHTS = [
  "Timeless Sheesham wood handicrafts made in Pakistan",
  "Skilled artisans, traditional techniques, modern design",
  "Each piece carries the natural grain, warmth and character of real wood",
];

function AboutWoodenHive() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/w4.jpg"
              alt="Handcrafted wooden pieces by WoodenHive"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = "/bg.jpg";
              }}
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              About WoodenHive
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Bringing nature home, one handmade piece at a time
            </h2>
            <p className="mt-4 text-muted-foreground">
              At WoodenHive, we bring the natural beauty of wood closer to your
              home through timeless Sheesham wood handicrafts made in Pakistan.
            </p>
            <p className="mt-3 text-muted-foreground">
              Rooted in traditional craftsmanship, every product reflects the
              warmth and character of premium wood, carefully crafted by skilled
              Pakistani artisans to add a natural touch to everyday living.
            </p>

            <ul className="mt-6 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="mt-8"
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
