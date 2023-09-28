import React, { createContext, useContext, useState, ReactNode } from "react";



interface IContext {
  cutItems: ICutItem[];
  setCutItems: (cutItems: ICutItem[]) => void;
}

const CutItemContext = createContext<IContext | undefined>(undefined);

export function useCutItemContext(): IContext {
  const context = useContext(CutItemContext);
  if (context === undefined) {
    throw new Error("useCutItemContext must be used within a CutItemProvider");
  }
  return context;
}

interface IProps {
  children: ReactNode;
}

export function CutItemProvider({ children }: IProps): JSX.Element {
  const [cutItems, setCutItems] = useState<ICutItem[]>([]);

  const value = {
    cutItems,
    setCutItems,
  };

  return (
    <CutItemContext.Provider value={value}>
      {children}
    </CutItemContext.Provider>
  );
}
