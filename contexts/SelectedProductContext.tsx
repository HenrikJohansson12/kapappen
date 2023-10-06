import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

//Spara den valda produkten så att vi kommer åt den från andra komponenter senare. 

interface SelectedProductContextData {
  selectedProduct: IProduct | null;
  setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
}

export const SelectedProductContext = createContext<SelectedProductContextData | undefined>(undefined);


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


export function useSelectedProductContext() {
  const context = useContext(SelectedProductContext);
  if (context === undefined) {
    throw new Error('useSelectedProductContext måste användas inomför en SelectedProductProvider');
  }
  return context;
}
