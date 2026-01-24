import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { useUI } from "../hooks/UIContext.jsx";

const routeConfig = {
  "/dashboard": {
    title: "Dashboard",
    action: null,
  },
  "/orders": {
    title: "Orders",
    action: "new-order",
  },
  "/clients": {
    title: "Clients",
    action: "new-client",
  },
};
console.log("Topbar loaded");
export default function Topbar() {
  const location = useLocation();
  const { openOrderModal } = useUI();
  const currentRoute = routeConfig[location.pathname];

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      {/* Page title */}
      <h2 className="text-lg font-semibold text-gray-900">
        {currentRoute?.title || ""}
      </h2>

      {/* Action button */}
      {currentRoute?.action && (
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          onClick={() => {
            if (currentRoute.action === "new-order") {
              openOrderModal();
            }
          }}
        >
          <Plus className="w-4 h-4" />
          {currentRoute.action === "new-order" && "New order"}
          {currentRoute.action === "new-client" && "New client"}
        </button>
      )}
    </header>
  );
}
