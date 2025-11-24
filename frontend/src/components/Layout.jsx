import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      {/* Outlet adalah tempat halaman (Home/Catalog) akan muncul */}
      <Outlet />
      
      {/* Navigasi Bawah selalu muncul di sini */}
      <BottomNav />
    </div>
  );
}