import { useClients } from "../hooks/ClientsContext.jsx";
import { Link } from "react-router-dom";

export default function ClientsPage() {
  const { clients } = useClients();

  const getOrdersCount = (clientName) =>
    clients.filter((o) => o.client === clientName).length;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Clients</h1>
          {/* luego aquí irá botón New Client */}
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Orders</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link
                      to={`/clients/${client.id}`}
                      className="hover:underline"
                    >
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {client.phone || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {client.email || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {getOrdersCount(client.name)}
                  </td>
                </tr>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No clients yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
