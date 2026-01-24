import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users } from "lucide-react";

function NavItem({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200\n        ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
}
console.log("Sidebar loaded");
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r px-4 py-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-gray-900">OrderFlow</h1>
        <p className="text-xs text-gray-500">Service dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        <NavItem
          to="/dashboard"
          label="Dashboard"
          icon={LayoutDashboard}
        />
        <NavItem
          to="/orders"
          label="Orders"
          icon={ClipboardList}
        />
        <NavItem
          to="/clients"
          label="Clients"
          icon={Users}
        />
      </nav>
    </aside>
  );
}
