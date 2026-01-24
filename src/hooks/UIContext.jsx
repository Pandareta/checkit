import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);
console.log("UIContext loaded");

export function UIProvider({ children }) {
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        isOrderModalOpen,
        openOrderModal: () => setIsOrderModalOpen(true),
        closeOrderModal: () => setIsOrderModalOpen(false),
        isClientModalOpen,
        openClientModal: () => setIsClientModalOpen(true),
        closeClientModal: () => setIsClientModalOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return context;
}
