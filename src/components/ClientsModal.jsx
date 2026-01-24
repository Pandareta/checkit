import { X } from "lucide-react";
import { useState } from "react";
import { useUI } from "../hooks/UIContext";
import { useClients } from "../hooks/ClientsContext";

export default function NewClientModal() {
  const { isClientModalOpen, closeClientModal } = useUI();
  const { createClient } = useClients();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  if (!isClientModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    createClient(formData);

    setFormData({
      name: "",
      phone: "",
      email: "",
    });

    closeClientModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeClientModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">New client</h3>
          <button
            onClick={closeClientModal}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 555 123 456"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="client@email.com"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={closeClientModal}
              className="px-4 py-2 text-sm rounded-xl border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Create client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
