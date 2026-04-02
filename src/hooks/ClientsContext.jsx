import { createContext, useContext, useState } from "react";

const ClientsContext = createContext();
const INITIAL_CLIENTS = [
  {
    id: "c1",
    name: "John Doe",
    phone: "+1 555 123 456",
    email: "john@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "c2",
    name: "Maria Lopez",
    phone: "+54 11 4567 8900",
    email: "maria@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "c3",
    name: "Tech Solusssstions SRL",
    phone: "+54 11 4321 9876",
    email: "contact@techsolutions.com",
    createdAt: new Date().toISOString(),
  },
];

export default function ClientsProvider({ children }) {
  const [clients, setClients] = useState(INITIAL_CLIENTS);

  const createClient = (data) => {
    const newClient = {
      id: crypto.randomUUID(),
      name: data.name,
      phone: data.phone || "",
      email: data.email || "",
      createdAt: Date.now(),
    };

    setClients((prev) => [...prev, newClient]);
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        createClient,
        deleteClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  console.log("useClients called, clients name: " + INITIAL_CLIENTS[0].name);
  return useContext(ClientsContext);
}
