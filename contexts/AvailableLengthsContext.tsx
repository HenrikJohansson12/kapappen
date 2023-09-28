import React, { createContext, useContext, useState, ReactNode } from "react";

interface IAvailableLengthsContext {
  availableLengths: number[];
  addAvailableLength: (length: number) => void;
  removeAvailableLength: (indexToRemove: number) => void;
}

const AvailableLengthsContext = createContext<IAvailableLengthsContext | undefined>(
  undefined
);

export function useAvailableLengthsContext(): IAvailableLengthsContext {
  const context = useContext(AvailableLengthsContext);
  if (context === undefined) {
    throw new Error(
      "useAvailableLengthsContext must be used within an AvailableLengthsProvider"
    );
  }
  return context;
}

interface IProps {
  children: ReactNode;
}

export function AvailableLengthsProvider({ children }: IProps): JSX.Element {
  const [availableLengths, setAvailableLengths] = useState<number[]>([]);

  const addAvailableLength = (length: number): void => {
    setAvailableLengths([...availableLengths, length]);
  };

  const removeAvailableLength = (indexToRemove: number): void => {
    const updatedAvailableLengths = availableLengths.filter(
      (_, index) => index !== indexToRemove
    );
    setAvailableLengths(updatedAvailableLengths);
  };

  const contextValue: IAvailableLengthsContext = {
    availableLengths,
    addAvailableLength,
    removeAvailableLength,
  };

  return (
    <AvailableLengthsContext.Provider value={contextValue}>
      {children}
    </AvailableLengthsContext.Provider>
  );
}
