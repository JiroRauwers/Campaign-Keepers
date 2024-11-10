"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { useComputedValues, computeFormula } from "@/hooks/useComputedValues";
import {
  getValueFromPath,
  getConfigFromPath,
  setValueInPath,
} from "@/lib/utils";

type SheetContextType = {
  data: Record<string, any>;
  structure: Record<string, any>;
  setValue: (path: string, value: any, field?: "value" | "description") => void;
  getConfig: (path: string) => any;
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
  const [data, setData] = useState(() => {
    const newData = structuredClone(initialData);
    Object.entries(newData).forEach(([key, value]) => {
      if (typeof value !== "object") {
        newData[key] = { value };
      }
    });
    return newData;
  });

  const setValue = useCallback(
    (path: string, value: any, field: "value" | "description" = "value") => {
      setData((prev) => {
        const newData = structuredClone(prev);
        setValueInPath(newData, path, value, field);
        return newData;
      });
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      data,
      structure,
      setValue,
      getConfig: (path: string) => getConfigFromPath(structure, path, data),
    }),
    [data, structure, setValue]
  );

  return (
    <SheetContext.Provider value={contextValue}>
      {children}
    </SheetContext.Provider>
  );
}

export function useSheetValue(path: string, hasDescription?: boolean) {
  const { data, setValue } = useSheet();

  const value = useMemo(
    () => getValueFromPath(data, path, "value"),
    [data, path]
  );

  const description = useMemo(
    () =>
      hasDescription ? getValueFromPath(data, path, "description") : undefined,
    [data, path, hasDescription]
  );

  const setValueAndDescription = useCallback(
    (newValue: any, newDescription?: string) => {
      setValue(path, newValue, "value");
      if (hasDescription && newDescription !== undefined) {
        setValue(path, newDescription, "description");
      }
    },
    [path, setValue, hasDescription]
  );

  return [value, description, setValueAndDescription] as const;
}

export function useSheetConfig(path: string) {
  const { getConfig } = useSheet();
  return useMemo(() => getConfig(path), [getConfig, path]);
}

export function useSheet() {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
}

export function useSheetDotValue(path: string) {
  const { data, setValue } = useSheet();

  const value = useMemo(
    () => getValueFromPath(data, path, "value"),
    [data, path]
  );

  const handleChange = useCallback(
    (newValue: number) => {
      setValue(path, newValue, "value");
    },
    [path, setValue]
  );

  return [value, handleChange] as const;
}
