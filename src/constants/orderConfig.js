/**
 * Configuración centralizada para órdenes
 * Contiene status, colores, labels, y reglas de negocio
 */

export const ORDER_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export const STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.IN_PROGRESS]: "In progress",
  [ORDER_STATUS.COMPLETED]: "Completed",
};

export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: "bg-yellow-100 text-yellow-700",
  [ORDER_STATUS.IN_PROGRESS]: "bg-blue-100 text-blue-700",
  [ORDER_STATUS.COMPLETED]: "bg-green-100 text-green-700",
};

export const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: ORDER_STATUS.PENDING, label: STATUS_LABELS[ORDER_STATUS.PENDING] },
  {
    value: ORDER_STATUS.IN_PROGRESS,
    label: STATUS_LABELS[ORDER_STATUS.IN_PROGRESS],
  },
  {
    value: ORDER_STATUS.COMPLETED,
    label: STATUS_LABELS[ORDER_STATUS.COMPLETED],
  },
];

/**
 * Flujo de transiciones de status permitidas
 * Define qué status puede cambiar a cuál
 */
export const STATUS_FLOW = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.IN_PROGRESS, ORDER_STATUS.COMPLETED],
  [ORDER_STATUS.IN_PROGRESS]: [ORDER_STATUS.COMPLETED, ORDER_STATUS.PENDING],
  [ORDER_STATUS.COMPLETED]: [ORDER_STATUS.IN_PROGRESS],
};

/**
 * Configuración de orden inicial (valores por defecto)
 */
export const DEFAULT_ORDER_VALUES = {
  client: "",
  technician: "",
  description: "",
  status: ORDER_STATUS.PENDING,
};
