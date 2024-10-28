export enum WindowType {
  Navigation = "navigation",
  Content = "content",
}

export enum WindowMode {
  Floating = "floating",
  Grounded = "grounded",
}

export interface Window {
  id: string;
  title: string;
  type: WindowType;
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
  stackId?: never; // This ensures stackId can't exist in non-stacked state
  timestamp: number;
}

// Union type that forces correct shape based on mode
export type WindowState = StackedWindowState | NonStackedWindowState;

export interface WindowContext {
  windows: Window[];
  dispatch: React.Dispatch<WindowAction>;
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

type AddWindowAction = {
  type: "add";
  window: Window;
};

export type WindowAction = AddWindowAction;
