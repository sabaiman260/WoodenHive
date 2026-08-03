import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "../common/footer";
import AnnouncementBar from "../common/announcement-bar";

function ShoppingLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Announcement Bar */}
      <AnnouncementBar />
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-1 flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
