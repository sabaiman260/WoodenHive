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
