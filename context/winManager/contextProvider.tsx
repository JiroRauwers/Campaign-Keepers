import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import {
  IWindow,
  ISliceInitialState,
  WindowStateModeEnum,
} from "../../lib/features/wm/types";
import { WindowReducer } from "./reducer";

const windowContext = createContext<ISliceInitialState | undefined>(undefined);
const LOCAL_STORAGE_KEY = "WinManager-Storage";

export default function WinManagerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const LocalStorageSave = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "{windows:[]}"
      );
    } catch (e) {
      return { windows: [] };
    }
  }, []);

  const [windows, dispatch] = useReducer(
    WindowReducer,
    LocalStorageSave,
    (state) => state.windows
  );

  const openWindows = useMemo(() => {
    return windows.filter((w) => w.state.mode === WindowStateModeEnum.Open);
  }, [windows]);

  useEffect(() => {
    return () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(windows));
    };
  }, []);

  return (
    <windowContext.Provider value={{ windows, dispatch }}>
      {children}
    </windowContext.Provider>
  );
}
