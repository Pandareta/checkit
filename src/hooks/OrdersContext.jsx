import { createContext, useContext, useState } from "react";
import { generateOrderId } from "../utils/orderHelpers.js";

/**
 * OrdersContext - Maneja el estado global de órdenes
 * Responsabilidades:
 * - CRUD de órdenes
 * - Persistencia (preparado para localStorage/backend)
 * - Validación básica
 *
 * NO incluye:
 * - Lógica de UI (filtros, estilos, confirmaciones)
 * - Eso va en hooks especializados como useOrderActions, useOrderFilters
 */
const OrdersContext = createContext(null);

const initialOrders = [
  {
    id: "ORD-001",
    client: "Juan Pérez",
    technician: "María",
    status: "pending",
    description: "Reparación de aire acondicionado",
    createdAt: "2026-01-10",
  },
  {
    id: "ORD-002",
    client: "Ana Gómez",
    technician: "Carlos",
    status: "in_progress",
    description: "Instalación de bombilla LED",
    createdAt: "2026-01-11",
  },
  {
    id: "ORD-003",
    client: "Luis Martínez",
    technician: "María",
    status: "completed",
    description: "Revisión de electricidad",
    createdAt: "2026-01-12",
  },
];

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);

  /**
   * Crea una nueva orden
   * @param {object} data - Datos: { client, technician, description, status }
   * @returns {object} Nueva orden creada
   */
  function createOrder(data) {
    const newOrder = {
      id: generateOrderId(orders.length),
      client: data.client,
      technician: data.technician,
      description: data.description || "",
      status: data.status || "pending",
      createdAt: new Date().toISOString().split("T")[0],
      dueDate: data.dueDate || null,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }

  /**
   * Actualiza una orden existente
   * @param {string} id - ID de la orden
   * @param {object} data - Datos a actualizar (merge)
   */
  function updateOrder(id, data) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, ...data, id } : order
      )
    );
  }

  /**
   * Elimina una orden por ID
   * @param {string} id - ID de la orden
   */
  function deleteOrder(id) {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  }

  /**
   * Obtiene una orden por ID
   * @param {string} id - ID de la orden
   * @returns {object|null} Orden encontrada o null
   */
  function getOrderById(id) {
    return orders.find((order) => order.id === id) || null;
  }

  const value = {
    orders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

/**
 * Hook para usar el contexto de órdenes
 * @throws {Error} Si se usa fuera de OrdersProvider
 */
export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }
  return ctx;
}
