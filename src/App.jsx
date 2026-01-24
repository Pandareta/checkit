import Sidebar from "./layout/Sidebar.jsx";
import Topbar from "./layout/Topbar.jsx";
import { UIProvider } from "./hooks/UIContext.jsx";
import { OrdersProvider } from "./hooks/OrdersContext.jsx";
import { Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrderModal from "./components/OrderModal.jsx";
import DashboardPage from "./components/Dashboard.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import  ClientsProvider  from "./hooks/ClientsContext.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
export default function App() {
  return (
    <>
      <UIProvider>
        <OrdersProvider>
            <ClientsProvider>

          <div className="flex h-screen bg-gray-50">
            {/* ASIDE */}
            <Sidebar />

            {/* COLUMNA DERECHA */}
            <div className="flex flex-col flex-1">
              <Topbar />

              <main className="flex-1 overflow-y-auto p-6">
                <Routes>
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/orders/:id" element={<OrderDetailPage />} />
                  <Route path="/clients" element={<ClientsPage />} />
                </Routes>
              </main>
            </div>
          </div>
          <OrderModal />
            </ClientsProvider>
        </OrdersProvider>
      </UIProvider>

    </>
  );
}
  