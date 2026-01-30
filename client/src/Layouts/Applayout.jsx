import { Outlet } from "react-router-dom";
import Navbar from "../componets/Navbar.jsx";

function AppLayout() {
  return (
    <>
      {/* Navbar visible only for app pages */}
      <Navbar />

      {/* This renders Dashboard / Admin / Project pages */}
      <main className="min-h-screen bg-[#020617] text-black p-4">
  <Outlet />
</main>
    
    </>
  );
}

export default AppLayout;
