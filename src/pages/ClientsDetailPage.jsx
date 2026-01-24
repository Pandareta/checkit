import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "../hooks/ClientsContext.jsx";
import { useOrders } from "../hooks/OrdersContext.jsx";

/**
 * ClientDetailPage - Detalle de cliente + listado de sus órdenes
 * Replica arquitectura de OrderDetailPage
 */
export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients } = useClients();
  const { orders } = useOrders();

  const client = clients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Client not found.</p>
        <button
          onClick={() => navigate("/clients")}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Back to clients
        </button>
      </div>
    );
  }

  // Órdenes asociadas a este cliente
  const clientOrders = orders.filter(
    (order) => order.client === client.name
  );

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Client detail</h1>
          <button
            onClick={() => navigate("/clients")}
            className="text-sm text-gray-500 hover:underline"
          >
            Back
          </button>
        </div>

        {/* Info del cliente */}
        <div className="space-y-4 mb-10">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-gray-900">{client.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">
              {client.phone || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">
              {client.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created at</p>
            <p className="text-gray-700">
              {new Date(client.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Órdenes del cliente */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Orders ({clientOrders.length})
          </h2>

          {clientOrders.length === 0 ? (
            <div className="py-10 text-gray-500 text-sm">
              This client has no orders yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left font-medium">
                      Technician
                    </th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-left font-medium">Created</th>
                    <th className="px-4 py-2 text-left font-medium">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {clientOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2 text-gray-900">
                        {order.description || "-"}
                      </td>

                      <td className="px-4 py-2 text-gray-700">
                        {order.technician}
                      </td>

                      <td className="px-4 py-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                          {order.status}
                        </span>
                      </td>

                      <td className="px-4 py-2 text-gray-500 text-xs">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-2">
                        <button
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View
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
    </div>
  );
}
