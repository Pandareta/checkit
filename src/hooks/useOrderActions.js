import { useCallback } from "react";
import { useOrders } from "./OrdersContext.jsx";

/**
 * Hook para encapsular acciones comunes sobre órdenes
 * Incluye confirmaciones y manejo de errores
 * @returns {object} { handleDelete, handleUpdate }
 */
export function useOrderActions() {
  const { deleteOrder, updateOrder } = useOrders();

  /**
   * Elimina una orden con confirmación previa
   * @param {string} orderId - ID de la orden
   * @param {string} clientName - Nombre del cliente (para confirmación)
   * @returns {boolean} true si se eliminó, false si se canceló
   */
  const handleDelete = useCallback(
    (orderId, clientName) => {
      const confirmed = window.confirm(
        `Delete order for ${clientName}? This action cannot be undone.`
      );
      if (confirmed) {
        deleteOrder(orderId);
        return true;
      }
      return false;
    },
    [deleteOrder]
  );

  /**
   * Actualiza una orden y notifica cambios
   * @param {string} orderId - ID de la orden
   * @param {object} data - Datos a actualizar
   * @returns {void}
   */
  const handleUpdate = useCallback(
    (orderId, data) => {
      try {
        updateOrder(orderId, data);
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },
    [updateOrder]
  );

  return {
    handleDelete,
    handleUpdate,
  };
}
