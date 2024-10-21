"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";

/**
 * Window size is the min/max size of width of the window in pixels.
 */

const DEFAULT_WINDOW_SIZE = { min: 300, max: 1000 };
interface WindowSize {
  min: number;
  max: number;
}

export enum WindowType {
  Floating,
  Grounded,
}

export interface ManagedWindow {
  id: string;
  title: string;
  type: WindowType;
  size: WindowSize;
  data: any;
}

export interface OpenWindow {
  id: string;
  timestamp: number;
}

interface WindowContextType {
  mainWindow: ManagedWindow;
  windows: ManagedWindow[];
  openWindows: OpenWindow[];
  toggleWindow: (window: ManagedWindow) => void;
  getOpenWindows: ManagedWindow[];
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

const LOCAL_STORAGE_OPEN_WINDOWS_KEY = "openWindows";

export const WindowProvider: React.FC<{
  children: ReactNode;
  mainWindowId: string;
}> = ({ children, mainWindowId }) => {
  const mainWindow = useMemo(
    () => ({
      id: mainWindowId,
      title: `Main Window ${mainWindowId}`,
      type: WindowType.Grounded,
      size: DEFAULT_WINDOW_SIZE,
      data: {},
    }),
    [mainWindowId]
  );

  const [openWindows, setOpenWindows] = useState<OpenWindow[]>(() => {
    let openWindows: OpenWindow[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_OPEN_WINDOWS_KEY) || "[]"
    );
    if (!Array.isArray(openWindows)) {
      openWindows = [];
    }
    if (!openWindows.find((window) => window.id === mainWindowId)) {
      openWindows.push({ id: mainWindowId, timestamp: Date.now() });
    }
    return openWindows;
  });

  useEffect(() => {
    // remove any duplicates
    const uniqueOpenWindows = openWindows.filter(
      (window, index, self) =>
        index === self.findIndex((t) => t.id === window.id)
    );

    localStorage.setItem(
      LOCAL_STORAGE_OPEN_WINDOWS_KEY,
      JSON.stringify(uniqueOpenWindows)
    );
  }, [openWindows]);

  const [windows, setWindows] = useState<ManagedWindow[]>([
    {
      id: "1",
      title: "sample window 1",
      type: WindowType.Floating,
      size: DEFAULT_WINDOW_SIZE,
      data: {},
    },
  ]);

  useEffect(() => {
    console.log("mainWindow", mainWindow);
  }, [mainWindow]);

  useEffect(() => {
    console.log("windows", windows);
  }, [windows]);

  useEffect(() => {
    console.log("openWindows", openWindows);
  }, [openWindows]);

  const getOpenWindows = useMemo(() => {
    const allWindows = [mainWindow, ...windows];

    return openWindows
      .map((openWindow) =>
        allWindows.find((window) => window.id === openWindow.id)
      )
      .filter((window) => window !== undefined) as ManagedWindow[];
  }, [openWindows, windows]);

  const canOpenWindow = (_window: ManagedWindow) => {
    if (!window) return false;

    return (
      !openWindows.find((openWindow) => openWindow.id === _window.id) &&
      openWindows.reduce(
        (acc, openWindow) =>
          acc + getOpenWindows.find((w) => w.id === openWindow.id)!.size.min,
        0
      ) +
        _window.size.min <=
        window.innerWidth
    );
  };

  const toggleWindow = (_window: ManagedWindow) => {
    if (canOpenWindow(_window)) {
      setOpenWindows([
        ...openWindows,
        { id: _window.id, timestamp: Date.now() },
      ]);
    } else if (openWindows.find((openWindow) => openWindow.id === _window.id)) {
      setOpenWindows(
        openWindows.filter((openWindow) => openWindow.id !== _window.id)
      );
    }
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        mainWindow,
        openWindows,
        toggleWindow,
        getOpenWindows,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = (): WindowContextType => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error("useWindowContext must be used within a WindowProvider");
  }
  return context;
};
