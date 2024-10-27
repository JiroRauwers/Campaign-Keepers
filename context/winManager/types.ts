import { OpenWindow } from "@/app/(views)/windowContext";

export enum WindowMode {
    Floating = "floating",
    Grounded = "grounded",
}

export interface Window {
    id: string;
    title: string;
    data: any;
    state: WindowState;
    settings: WindowSettings;
}

export interface WindowSettings {
    /**
     * The priority of the window.
     * Higher priority windows will take precedence over lower priority windows.
     */
    mode: WindowMode;
    priority: number;
    size: WindowSize;
    position: WindowPosition;
}

export interface WindowPosition {
    direction: WindowDirection;
    priority: number;
}

export enum WindowDirection {
    Left = "left",
    Right = "right",
}

export interface WindowSize {
    min: number;
    max: number;
}

export enum WindowStateMode {
    Open = "open",
    Minimized = "minimized",
    Stacked = "stacked",
}

// Create separate interfaces for stacked and non-stacked states
interface StackedWindowState {
    mode: WindowStateMode.Stacked;
    stackId: string;
    timestamp: number;
}

interface NonStackedWindowState {
    mode: WindowStateMode.Open | WindowStateMode.Minimized;
    stackId?: never;  // This ensures stackId can't exist in non-stacked state
    timestamp: number;
}

// Union type that forces correct shape based on mode
export type WindowState = StackedWindowState | NonStackedWindowState;

interface WindowContext {
    windows: Window[];
    addWindow: (window: Window) => void;
    // removeWindow: (window: Window) => void;
    updateWindowData: (windowId: string, data: any) => void;
    updateWindowSettings: (windowId: string, settings: WindowSettings) => void;
    updateWindowState: (windowId: string, state: WindowState) => void;
    getWindow: (windowId: string) => Window | undefined;
    getOpenWindows: () => Window[];

    getStackedWindows: (windowId: string) => Window[];

}


export const DEFAULT_WINDOW_SIZE: WindowSize = { min: 600, max: 1000 };
export const DEFAULT_WINDOW_SETTINGS: WindowSettings = {
    mode: WindowMode.Floating,
    priority: 0,
    size: DEFAULT_WINDOW_SIZE,
    position: { direction: WindowDirection.Left, priority: 0 },
};
export const DEFAULT_WINDOW_STATE: NonStackedWindowState = {
    mode: WindowStateMode.Open,
    timestamp: Date.now(),
};
