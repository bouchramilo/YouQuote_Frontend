// src/components/LayoutDashboard.jsx
import { Outlet, Link } from "react-router-dom";
import SideBar from "./SideBar";

export default function LayoutDashboard() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
