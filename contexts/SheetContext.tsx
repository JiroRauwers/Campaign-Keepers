"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { useComputedValues } from "@/hooks/useComputedValues";
import { getValueFromPath } from "@/lib/utils";

type SheetContextType = {
  data: Record<string, any>;
  structure: Record<string, any>;
  setValue: (path: string, value: any) => void;
};

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export function SheetProvider({
  children,
  initialData,
  structure,
}: {
  children: React.ReactNode;
  initialData: Record<string, any>;
  structure: Record<string, any>;
}) {
  const [data, setData] = useState(initialData);

  const handleComputedChange = useCallback((path: string, value: number) => {
    console.log("handleComputedChange", path, value);

    setData((prev) => {
      const newData = { ...prev };
      const parts = path.split(".");
      let current = newData;

      // Navigate to the parent object
      for (let i = 0; i < parts.length - 1; i++) {
        if (!(parts[i] in current)) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }

      // Update the value
      current[parts[parts.length - 1]] = value;
      return newData;
    });
  }, []);

  // Use the computed values hook
  useComputedValues(data, structure, handleComputedChange);

  const setValue = useCallback((path: string, value: any) => {
    setData((prev) => {
      const newData = structuredClone(prev); // Use structuredClone for deep copy
      const parts = path.split(".");
      let current = newData;

      // Navigate to the parent object
      for (let i = 0; i < parts.length - 1; i++) {
        if (!(parts[i] in current)) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }

      // Update the value
      current[parts[parts.length - 1]] = value;
      return newData;
    });
  }, []);

  return (
    <SheetContext.Provider value={{ data, setValue, structure }}>
      {children}
    </SheetContext.Provider>
  );
}

export function useSheet() {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
}

export function useSheetValue(path: string) {
  const { data, setValue } = useSheet();
  // Use the helper function to get nested values
  const value = getValueFromPath(data, path);
  return [value, (newValue: any) => setValue(path, newValue)] as const;
}
