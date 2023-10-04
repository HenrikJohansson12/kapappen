// SQLiteDataContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface SQLiteDataContextProps {
  children: React.ReactNode;
}

interface SQLiteDataContextValue {
  dataUpdated: boolean;
  updateData: () => void;
}

const SQLiteDataContext = createContext<SQLiteDataContextValue | undefined>(undefined);

export function SQLiteDataProvider({ children }: SQLiteDataContextProps) {
  const [dataUpdated, setDataUpdated] = useState(false);

  const updateData = () => {
    setDataUpdated((prev) => !prev); // Invertera state för att trigga uppdatering
  };

  return (
    <SQLiteDataContext.Provider value={{ dataUpdated, updateData }}>
      {children}
    </SQLiteDataContext.Provider>
  );
}

export function useSQLiteData(): SQLiteDataContextValue {
  const context = useContext(SQLiteDataContext);
  if (context === undefined) {
    throw new Error('useSQLiteData must be used within a SQLiteDataProvider');
  }
  return context;
}
