import { nanoid } from "@reduxjs/toolkit";

export enum WindowTypeEnum {
  None = "none",
  Navigation = "navigation",
  Content = "content",
}

export enum WindowModeEnum {
  Floating = "floating",
  Grounded = "grounded",
}

export interface IWindow {
  id: string;
  data: any;
  type: WindowTypeEnum;
  state: TWindowState;
  settings: IWindowSettings;
}

export interface IWindowSettings {
  /**
   * The priority of the window.
   * Higher priority windows will take precedence over lower priority windows.
   */
  mode: WindowModeEnum;
  priority: number;
  size: IWindowSize;
  position: IWindowPosition;
}

export interface IWindowPosition {
  direction: WindowDirectionEnum;
  priority: number;
}

export enum WindowDirectionEnum {
  Left = "left",
  Right = "right",
}

export interface IWindowSize {
  min: number;
  max: number;
}

export enum WindowStateModeEnum {
  Open = "open",
  Minimized = "minimized",
  Stacked = "stacked",
}

// Create separate interfaces for stacked and non-stacked states
interface _IStackedWindowState {
  mode: WindowStateModeEnum.Stacked;
  stackId: string;
  timestamp: number;
}

interface _INonStackedWindowState {
  mode: WindowStateModeEnum.Open | WindowStateModeEnum.Minimized;
  stackId?: never; // This ensures stackId can't exist in non-stacked state
  timestamp: number;
}

// Union type that forces correct shape based on mode
export type TWindowState = _IStackedWindowState | _INonStackedWindowState;

export interface ISliceInitialState {
  windows: IWindow[];
  edditMode: boolean;
}

export const DEFAULT_WINDOW_SIZE: IWindowSize = { min: 600, max: 1000 };
export const DEFAULT_WINDOW_SETTINGS: IWindowSettings = {
  mode: WindowModeEnum.Floating,
  priority: 0,
  size: DEFAULT_WINDOW_SIZE,
  position: { direction: WindowDirectionEnum.Left, priority: 0 },
};

export const DEFAULT_WINDOW_STATE: _INonStackedWindowState = {
  mode: WindowStateModeEnum.Open,
  timestamp: Date.now(),
};
