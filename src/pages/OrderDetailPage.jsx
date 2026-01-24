import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrders } from "../hooks/OrdersContext.jsx";


export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder } = useOrders();

  const order = orders.find((o) => o.id === id);
 const [status, setStatus] = useState(order?.status || "pending");
 
  if (!order) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Order not found.</p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Back to orders
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Order detail</h1>
          <button
            onClick={() => navigate("/orders")}
            className="text-sm text-gray-500 hover:underline"
          >
            Back
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-medium text-gray-900">{order.client}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Technician</p>
            <p className="font-medium text-gray-900">{order.technician}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-gray-800 whitespace-pre-line">
              {order.description || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created at</p>
            <p className="text-gray-700">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Due date</p>
            <p className="text-gray-700">
              {order.dueDate
                ? new Date(order.dueDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

        <div className="pt-6 flex justify-end">
          <button
            onClick={() => {
              updateOrder(order.id, { status });
              navigate("/orders");
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
      </div>
  );
}
