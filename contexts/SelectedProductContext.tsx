import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Skapa din context
interface SelectedProductContextData {
  selectedProduct: IProduct | null;
  setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
}

export const SelectedProductContext = createContext<SelectedProductContextData | undefined>(undefined);

// Skapa en komponent som kommer att fungera som Context Provider
interface SelectedProductProviderProps {
  children: ReactNode;
}

export function SelectedProductProvider({ children }: SelectedProductProviderProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const contextValue: SelectedProductContextData = {
    selectedProduct,
    setSelectedProduct,
  };

  return (
    <SelectedProductContext.Provider value={contextValue}>
      {children}
    </SelectedProductContext.Provider>
  );
}

// Skapa en egen hook för att enkelt komma åt context
export function useSelectedProductContext() {
  const context = useContext(SelectedProductContext);
  if (context === undefined) {
    throw new Error('useSelectedProductContext måste användas inomför en SelectedProductProvider');
  }
  return context;
}
