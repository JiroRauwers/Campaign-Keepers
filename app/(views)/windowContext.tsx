"use client";

import { Button } from "@/components/ui/button";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { concat, randomString } from "remeda";

/**
 * Window size is the min/max size of width of the window in pixels.
 */

const DEFAULT_WINDOW_SIZE = { min: 600, max: 1000 };
const WINDOW_MARGIN = 40;
const LOCAL_STORAGE_KEY = "openWindows";

interface WindowSize {
  min: number;
  max: number;
}

export enum WindowMode {
  Floating,
  Grounded,
}

export interface ManagedWindow {
  id: string;
  title: string;
  type: WindowMode;
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
  addWindow: (window: ManagedWindow) => void;
  getOpenWindows: ManagedWindow[];
  updateWindowTimestamp: (windowId: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{
  children: ReactNode;
  mainWindowId: string;
}> = ({ children, mainWindowId }) => {
  const mainWindow = useMemo(
    () => ({
      id: mainWindowId,
      title: `Main Window ${mainWindowId}`,
      type: WindowMode.Grounded,
      size: DEFAULT_WINDOW_SIZE,
      data: {},
    }),
    [mainWindowId]
  );

  const [windows, setWindows] = useState<ManagedWindow[]>([
    {
      id: "1",
      title: "sample window 1",
      type: WindowMode.Floating,
      size: DEFAULT_WINDOW_SIZE,
      data: {},
    },
    {
      id: "2",
      title: "sample window 2",
      type: WindowMode.Floating,
      size: DEFAULT_WINDOW_SIZE,
      data: {},
    },
  ]);

  const [openWindows, setOpenWindows] = useState<OpenWindow[]>(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const valid = Array.isArray(stored) ? stored : [];
    return valid.find((w) => w.id === mainWindowId)
      ? valid
      : [...valid, { id: mainWindowId, timestamp: Date.now() }];
  });

  // Save to localStorage whenever openWindows changes
  useEffect(() => {
    const unique = openWindows.filter(
      (w, i, self) => i === self.findIndex((t) => t.id === w.id)
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unique));
  }, [openWindows]);

  const getOpenWindows = useMemo(() => {
    const allWindows = [mainWindow, ...windows];
    return openWindows
      .map((open) => allWindows.find((w) => w.id === open.id))
      .filter((w): w is ManagedWindow => w !== undefined);
  }, [openWindows, windows, mainWindow]);

  const calculateTotalWidth = (windowList: ManagedWindow[]) =>
    windowList.reduce((acc, w) => acc + w.size.min, 0);

  const closeWindowsUntilFit = (
    currentWindows: OpenWindow[],
    totalNeeded: number,
    newWindowId?: string
  ) => {
    let sortedWindows = [...currentWindows]
      .sort((a, b) => a.timestamp - b.timestamp)
      .filter((w) => w.id !== mainWindow.id);

    let updatedWindows = [...currentWindows];

    while (
      totalNeeded > window.innerWidth - WINDOW_MARGIN &&
      sortedWindows.length > 0
    ) {
      const oldest = sortedWindows.shift();
      if (!oldest) break;
      updatedWindows = updatedWindows.filter((w) => w.id !== oldest.id);

      const remainingWindows = getOpenWindows.filter((w) =>
        updatedWindows.some((ow) => ow.id === w.id)
      );

      totalNeeded =
        calculateTotalWidth(remainingWindows) +
        (newWindowId ? DEFAULT_WINDOW_SIZE.min : 0);
    }

    return updatedWindows;
  };

  const toggleWindow = (targetWindow: ManagedWindow) => {
    const isOpen = openWindows.find((w) => w.id === targetWindow.id);

    if (isOpen) {
      setOpenWindows(openWindows.filter((w) => w.id !== targetWindow.id));
      return;
    }

    const totalNeeded =
      calculateTotalWidth(getOpenWindows) + targetWindow.size.min;

    if (totalNeeded <= window.innerWidth - WINDOW_MARGIN) {
      setOpenWindows([
        ...openWindows,
        { id: targetWindow.id, timestamp: Date.now() },
      ]);
    } else {
      const updatedWindows = closeWindowsUntilFit(
        openWindows,
        totalNeeded,
        targetWindow.id
      );
      setOpenWindows([
        ...updatedWindows,
        { id: targetWindow.id, timestamp: Date.now() },
      ]);
    }
  };

  const addWindow = (newWindow: ManagedWindow) => {
    setWindows(concat([newWindow]));
    toggleWindow(newWindow);
  };

  const updateWindowTimestamp = (windowId: string) => {
    setOpenWindows(
      openWindows.map((w) =>
        w.id === windowId ? { ...w, timestamp: Date.now() } : w
      )
    );
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const totalNeeded = calculateTotalWidth(getOpenWindows);
      if (totalNeeded > window.innerWidth - WINDOW_MARGIN) {
        const updatedWindows = closeWindowsUntilFit(openWindows, totalNeeded);
        setOpenWindows(updatedWindows);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windows, openWindows, getOpenWindows, mainWindow]);

  return (
    <WindowContext.Provider
      value={{
        windows,
        mainWindow,
        openWindows,
        toggleWindow,
        getOpenWindows,
        updateWindowTimestamp,
        addWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = (): WindowContextType => {
  const context = useContext(WindowContext);
  if (!context)
    throw new Error("useWindowContext must be used within a WindowProvider");
  return context;
};

export const CreateWindow = ({
  id,
  title,
  type,
}: {
  id?: string;
  title: string;
  type: WindowMode;
}) => {
  const { addWindow } = useWindowContext();
  return (
    <Button
      onClick={() =>
        addWindow({
          id: id ?? randomString(5),
          title,
          type,
          size: DEFAULT_WINDOW_SIZE,
          data: {},
        })
      }
    >
      create window {title}
    </Button>
  );
};
