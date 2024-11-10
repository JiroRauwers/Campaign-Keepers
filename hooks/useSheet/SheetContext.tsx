"use client";

import { createContext, useContext } from "react";

interface SheetContextType {
  id: string | null;
}

export const SheetContext = createContext<SheetContextType>({ id: null });

export function _useSheetId() {
  return useContext(SheetContext);
}

export function SheetProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ id }}>{children}</SheetContext.Provider>
  );
}
