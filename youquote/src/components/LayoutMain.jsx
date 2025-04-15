// src/components/LayoutMain.jsx
import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutMain() {
  return (
    <div>
      <Header />

      <main className="p-4 bg-background min-h-screen flex items-center justify-center font-zen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
