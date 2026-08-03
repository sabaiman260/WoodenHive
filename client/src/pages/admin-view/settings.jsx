import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "@/lib/api";
import {
  getAnnouncementBar,
  setAnnouncementBar,
  getHeroImages,
  setHeroImages,
} from "@/store/admin/settings-slice";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Plus, UploadCloud } from "lucide-react";

function AdminSettings() {
  const dispatch = useDispatch();
  const { announcementBar, heroImages, isLoading } = useSelector(
    (state) => state.adminSettings || {}
  );
  const { toast } = useToast();

  // Announcement Bar State
  const [announcement, setAnnouncement] = useState({
    backgroundColor: "#1a1a1a",
    segments: [
      { text: "ðŸŽ‰ HAPPY 14 AUGUST!", bgColor: "#0f5c3a", textColor: "#FFD700" },
      { text: "EXCLUSIVE OFFERS UP TO 50% OFF", bgColor: "#FFD700", textColor: "#000000" },
      { text: "FREE DELIVERY ON ALL ORDERS", bgColor: "#0f5c3a", textColor: "#FFD700" },
    ],
    isActive: false,
  });

  // Hero Images State
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isUploadingHeroImage, setIsUploadingHeroImage] = useState(false);

  useEffect(() => {
    dispatch(getAnnouncementBar());
    dispatch(getHeroImages());
  }, [dispatch]);

  useEffect(() => {
    if (announcementBar) {
      setAnnouncement((prev) => ({
        ...prev,
        ...announcementBar,
        segments:
          Array.isArray(announcementBar.segments) && announcementBar.segments.length > 0
            ? announcementBar.segments
            : prev.segments,
      }));
    }
  }, [announcementBar]);

  useEffect(() => {
    if (heroImages && Array.isArray(heroImages)) {
      setImages(heroImages);
    }
  }, [heroImages]);

  const handleSegmentChange = (index, field, value) => {
    setAnnouncement((prev) => {
      const newSegments = [...prev.segments];
      newSegments[index] = { ...newSegments[index], [field]: value };
      return { ...prev, segments: newSegments };
    });
  };

  const handleAddSegment = () => {
    setAnnouncement((prev) => ({
      ...prev,
      segments: [
        ...prev.segments,
        { text: "New Offer", bgColor: "#0f5c3a", textColor: "#FFD700" },
      ],
    }));
  };

  const handleRemoveSegment = (index) => {
    setAnnouncement((prev) => ({
      ...prev,
      segments: prev.segments.filter((_, i) => i !== index),
    }));
  };

  const handleSaveAnnouncement = async () => {
    dispatch(setAnnouncementBar(announcement)).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Announcement bar updated successfully" });
      } else {
        toast({ title: "Failed to update announcement bar", variant: "destructive" });
      }
    });
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      toast({ title: "Please enter an image URL", variant: "destructive" });
      return;
    }
    setImages((prev) => [...prev, newImageUrl]);
    setNewImageUrl("");
    toast({ title: "Image added (click Save to persist)" });
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHeroImageFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploadingHeroImage(true);
    const uploadedUrls = [];
    for (const file of files) {
      const data = new FormData();
      data.append("my_file", file);
      try {
        const response = await axios.post(
          apiUrl("/api/admin/products/upload-image"),
          data
        );
        if (response?.data?.success) {
          uploadedUrls.push(response.data.result.url);
        }
      } catch (e) {
        console.error("Hero image upload failed", e);
      }
    }

    if (uploadedUrls.length > 0) {
      setImages((prev) => [...prev, ...uploadedUrls]);
      toast({ title: "Image(s) uploaded (click Save to persist)" });
    } else {
      toast({ title: "Failed to upload image(s)", variant: "destructive" });
    }

    setIsUploadingHeroImage(false);
    event.target.value = "";
  };

  const handleSaveHeroImages = async () => {
    dispatch(setHeroImages(images)).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Hero images updated successfully" });
      } else {
        toast({ title: "Failed to update hero images", variant: "destructive" });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Announcement Bar Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Announcement Bar Settings - 14 August Sales & Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Bar Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={announcement.backgroundColor}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, backgroundColor: e.target.value })
                }
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <input
                type="text"
                value={announcement.backgroundColor}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, backgroundColor: e.target.value })
                }
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b2a25]"
                placeholder="#1a1a1a"
              />
            </div>
          </div>

          {/* Segments */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Offer Segments (Green & Gold Highlights)</p>
            {(announcement.segments || []).map((segment, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Segment {index + 1}</h4>
                  {announcement.segments.length > 1 && (
                    <button
                      onClick={() => handleRemoveSegment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Text</label>
                  <textarea
                    value={segment.text}
                    onChange={(e) => handleSegmentChange(index, "text", e.target.value)}
                    className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#3b2a25]"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={segment.bgColor}
                        onChange={(e) => handleSegmentChange(index, "bgColor", e.target.value)}
                        className="w-12 h-10 border rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={segment.bgColor}
                        onChange={(e) => handleSegmentChange(index, "bgColor", e.target.value)}
                        className="flex-1 p-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#3b2a25]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Text Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={segment.textColor}
                        onChange={(e) => handleSegmentChange(index, "textColor", e.target.value)}
                        className="w-12 h-10 border rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={segment.textColor}
                        onChange={(e) => handleSegmentChange(index, "textColor", e.target.value)}
                        className="flex-1 p-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#3b2a25]"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div
                  className="w-full p-3 rounded text-center font-semibold"
                  style={{
                    backgroundColor: segment.bgColor,
                    color: segment.textColor,
                  }}
                >
                  {segment.text || "Preview"}
                </div>
              </div>
            ))}

            <Button
              onClick={handleAddSegment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Offer Segment
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={announcement.isActive}
              onChange={(e) =>
                setAnnouncement({ ...announcement, isActive: e.target.checked })
              }
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
              Active
            </label>
          </div>

          {/* Full Preview */}
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <p className="text-sm font-medium text-gray-600 mb-2">Preview (Scrolling):</p>
            <div
              className="overflow-hidden rounded"
              style={{
                backgroundColor: announcement.backgroundColor,
              }}
            >
              <div className="flex gap-0 animate-pulse">
                {(announcement.segments || []).map((segment, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 px-4 py-3 font-semibold"
                    style={{
                      backgroundColor: segment.bgColor,
                      color: segment.textColor,
                    }}
                  >
                    {segment.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSaveAnnouncement}
            disabled={isLoading}
            className="w-full bg-[#3b2a25] hover:bg-[#2a1f1a] text-white"
          >
            {isLoading ? "Saving..." : "Save Announcement Bar"}
          </Button>
        </CardContent>
      </Card>

      {/* Hero Images Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Hero Image (from your computer)
            </label>
            <label
              htmlFor="hero-image-upload"
              className={`flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-md cursor-pointer ${
                isUploadingHeroImage ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <UploadCloud className="w-6 h-6 text-muted-foreground mb-1" />
              <span className="text-sm text-muted-foreground">
                {isUploadingHeroImage ? "Uploading..." : "Click to select image(s)"}
              </span>
              <input
                id="hero-image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleHeroImageFileChange}
                disabled={isUploadingHeroImage}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Or Add Hero Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b2a25]"
              />
              <Button
                onClick={handleAddImage}
                className="bg-[#3b2a25] hover:bg-[#2a1f1a] text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Images List */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Current Images:</p>
            {images.length === 0 ? (
              <p className="text-sm text-gray-500">No images added yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div className="relative group">
                      <img
                        src={image}
                        alt={`Hero ${index + 1}`}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x150?text=Image+Error";
                        }}
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-2 bg-gray-50 text-xs text-gray-600 truncate">
                      {image}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleSaveHeroImages}
            disabled={isLoading}
            className="w-full bg-[#3b2a25] hover:bg-[#2a1f1a] text-white"
          >
            {isLoading ? "Saving..." : "Save Hero Images"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminSettings;
