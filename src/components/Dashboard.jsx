import { useOrders } from "../hooks/OrdersContext.jsx";

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { orders } = useOrders();

  const total = orders.length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const inProgress = orders.filter((o) => o.status === "in_progress").length;
  const completed = orders.filter((o) => o.status === "completed").length;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total orders" value={total} />
          <StatCard title="Pending" value={pending} />
          <StatCard title="In progress" value={inProgress} />
          <StatCard title="Completed" value={completed} />
        </div>
      </div>
    </div>
  );
}
