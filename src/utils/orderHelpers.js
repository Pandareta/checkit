/**
 * Funciones auxiliares para órdenes
 * Lógica pura sin dependencias de contexto o estado
 */

import {
  STATUS_LABELS,
  STATUS_COLORS,
  ORDER_STATUS,
} from "../constants/orderConfig.js";

/**
 * Obtiene el label en español para un status
 * @param {string} status - El status de la orden
 * @returns {string} Label del status
 */
export function getStatusLabel(status) {
  return STATUS_LABELS[status] || status;
}

/**
 * Obtiene las clases Tailwind para colorear un status
 * @param {string} status - El status de la orden
 * @returns {string} Clases CSS de Tailwind
 */
export function getStatusColor(status) {
  return STATUS_COLORS[status] || "bg-gray-100 text-gray-600";
}

/**
 * Formatea una fecha a formato localizado
 * @param {string|Date} dateInput - Fecha ISO o Date object
 * @returns {string} Fecha formateada
 */
export function formatOrderDate(dateInput) {
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "-";
  }
}

/**
 * Obtiene los status válidos a los que puede cambiar desde uno actual
 * @param {string} currentStatus - Status actual
 * @returns {string[]} Array de status válidos
 */
export function getValidNextStatuses(currentStatus) {
  const validTransitions = {
    [ORDER_STATUS.PENDING]: [
      ORDER_STATUS.IN_PROGRESS,
      ORDER_STATUS.COMPLETED,
    ],
    [ORDER_STATUS.IN_PROGRESS]: [ORDER_STATUS.COMPLETED, ORDER_STATUS.PENDING],
    [ORDER_STATUS.COMPLETED]: [ORDER_STATUS.IN_PROGRESS],
  };
  return validTransitions[currentStatus] || [];
}

/**
 * Valida si una orden tiene datos mínimos requeridos
 * @param {object} orderData - Datos de la orden
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export function validateOrder(orderData) {
  const errors = [];

  if (!orderData.client?.trim()) {
    errors.push("Client name is required");
  }
  if (!orderData.technician?.trim()) {
    errors.push("Technician is required");
  }
  if (!orderData.status || !Object.values(ORDER_STATUS).includes(orderData.status)) {
    errors.push("Invalid status");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Genera un ID único para orden (temporal, sin backend)
 * @param {number} totalOrders - Cantidad actual de órdenes
 * @returns {string} ID de orden formateado (ORD-XXX)
 */
export function generateOrderId(totalOrders) {
  return `ORD-${String(totalOrders + 1).padStart(3, "0")}`;
}
