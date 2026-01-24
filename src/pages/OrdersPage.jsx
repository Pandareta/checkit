import { useOrders } from "../hooks/OrdersContext.jsx";
import { useOrderFilters } from "../hooks/useOrderFilters.js";
import { useOrderActions } from "../hooks/useOrderActions.js";
import { useNavigate } from "react-router-dom";
import {
  STATUS_OPTIONS,
  STATUS_COLORS,
} from "../constants/orderConfig.js";
import {
  getStatusLabel,
  formatOrderDate,
} from "../utils/orderHelpers.js";

/**
 * StatusBadge - Componente para renderizar el status visual de una orden
 * Centralizado: usa constants/orderConfig para colores y labels
 */
function StatusBadge({ status }) {
  const backgroundColor = STATUS_COLORS[status] || "bg-gray-100 text-gray-600";
  const label = getStatusLabel(status);

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${backgroundColor}`}>
      {label}
    </span>
  );
}

/**
 * OrdersPage - Listado de órdenes con filtros y acciones
 * Limpia: solo maneja presentación y eventos
 * Lógica extraída a hooks reutilizables
 */
export default function OrdersPage() {
  const { orders } = useOrders();
  const { handleDelete } = useOrderActions();
  const { filteredOrders, statusFilter, setStatusFilter } =
    useOrderFilters(orders);
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border">
        {/* Header con filtros */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Orders{" "}
            <span className="text-sm font-normal text-gray-500">
              ({filteredOrders.length})
            </span>
          </h1>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500">
            <p className="text-lg font-medium mb-1">No orders found</p>
            <p className="text-sm">Try changing the filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Client</th>
                  <th className="px-6 py-3 text-left font-medium">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left font-medium">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Created</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {order.client}
                    </td>

                    <td className="px-6 py-3 text-gray-700">
                      {order.technician}
                    </td>

                    <td className="px-6 py-3 text-gray-600 max-w-xs truncate">
                      {order.description || "-"}
                    </td>

                    <td className="px-6 py-3">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-6 py-3 text-gray-500 text-xs">
                      {formatOrderDate(order.createdAt)}
                    </td>

                    <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(order.id, order.client)
                        }
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
