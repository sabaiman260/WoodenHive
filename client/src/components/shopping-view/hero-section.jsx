import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeroImages } from "@/store/admin/settings-slice";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

function HeroSection() {
  const dispatch = useDispatch();
  const { heroImages } = useSelector((state) => state.adminSettings || {});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fallback images if none are configured
  const defaultImages = [
    { image: "/hero/slider1.jpg" },
    { image: "/hero/slider2.jpg" },
    { image: "/hero/slider3.jpg" },
  ];

  const displayImages = heroImages && heroImages.length > 0
    ? heroImages.map((img) => ({ image: img }))
    : defaultImages;

  // Intro copy revealed piece by piece, in sync with each slide
  const introSlides = [
    {
      title: "Bringing Nature Home with WoodenHive",
      text: (
        <>
          At <strong>WoodenHive</strong>, we bring the natural beauty of wood
          closer to your home through timeless{" "}
          <strong>Sheesham wood handicrafts made in Pakistan</strong>.
        </>
      ),
    },
    {
      title: "Rooted in Traditional Craftsmanship",
      text: (
        <>
          Each piece reflects the natural grain, warmth, and character of{" "}
          <strong>premium Sheesham wood</strong>, carefully crafted by skilled
          Pakistani artisans.
        </>
      ),
    },
    {
      title: "Handmade, Authentic, Timeless",
      text: (
        <>
          Discover <strong>handmade wooden products from Pakistan</strong>{" "}
          that add warmth, beauty, and a natural touch to everyday living.
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    dispatch(getHeroImages()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-200">
      {displayImages.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          alt={`hero-${index}`}
          onError={(e) => {
            e.target.src = "/hero/slider1.jpg"; // Fallback to default on error
          }}
        />
      ))}

      {/* First slide already has its own baked-in text, so skip the overlay there */}
      {currentSlide !== 0 && (
        <>
          {/* Dark gradient so overlay text stays readable on any image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Intro copy overlay, one piece revealed per slide */}
          <div className="absolute inset-0 flex items-end md:items-center">
            <div className="container mx-auto px-6 md:px-12 pb-10 md:pb-0">
              <div className="max-w-xl">
                {introSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-1000 ${
                      index === currentSlide % introSlides.length
                        ? "opacity-100"
                        : "opacity-0 absolute"
                    }`}
                  >
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 drop-shadow-md">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed drop-shadow-md">
                      {slide.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {!loading && displayImages.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + displayImages.length) % displayImages.length
              )
            }
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronLeftIcon />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % displayImages.length)
            }
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronRightIcon />
          </Button>
        </>
      )}
    </div>
  );
}

export default HeroSection;
