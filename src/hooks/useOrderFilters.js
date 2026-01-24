import { useState, useMemo } from "react";

/**
 * Hook para manejar filtrado de órdenes por status
 * @param {Array} orders - Lista de órdenes completa
 * @returns {object} { filteredOrders, statusFilter, setStatusFilter }
 */
export function useOrderFilters(orders = []) {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  return {
    filteredOrders,
    statusFilter,
    setStatusFilter,
  };
}
