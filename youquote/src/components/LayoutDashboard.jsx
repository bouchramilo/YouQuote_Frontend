// src/components/LayoutDashboard.jsx
import { Outlet, Link } from "react-router-dom";

export default function LayoutDashboard() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <ul className="space-y-2">
          <li><Link to="/dashboard">Dashboard</Link></li>
          {/* <li><Link to="/settings">Paramètres</Link></li> */}
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
