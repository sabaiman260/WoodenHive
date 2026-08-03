import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncementBar } from "@/store/admin/settings-slice";
import "./announcement-bar.css";

function AnnouncementBar() {
  const dispatch = useDispatch();
  const { announcementBar } = useSelector((state) => state.adminSettings || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getAnnouncementBar()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading || !announcementBar || !announcementBar.isActive) {
    return null;
  }

  const { segments = [], backgroundColor } = announcementBar;
  const rawSegments = segments.length > 0 
    ? segments 
    : [
        { text: "🎉 HAPPY 14 AUGUST!", bgColor: "#0f5c3a", textColor: "#FFD700" },
        { text: "EXCLUSIVE OFFERS UP TO 50% OFF", bgColor: "#FFD700", textColor: "#000000" },
        { text: "FREE DELIVERY ON ALL ORDERS", bgColor: "#0f5c3a", textColor: "#FFD700" },
      ];
  // Force a consistent green background and white text across all segments
  const displaySegments = rawSegments.map((segment) => ({
    ...segment,
    bgColor: "#0f5c3a",
    textColor: "#ffffff",
  }));

  return (
    <div
      className="announcement-bar-container"
      style={{
        backgroundColor: backgroundColor || "#1a1a1a",
      }}
    >
      <div className="announcement-bar-content">
        <div className="announcement-bar-slider">
          {/* Create multiple copies for seamless loop */}
          {[0, 1, 2, 3].map((copy) =>
            displaySegments.map((segment, index) => (
              <span
                key={`${copy}-${index}`}
                className="announcement-segment"
                style={{
                  backgroundColor: segment.bgColor,
                  color: segment.textColor,
                }}
              >
                {segment.text}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
