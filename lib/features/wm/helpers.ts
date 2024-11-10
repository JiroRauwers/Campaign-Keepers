import { nanoid } from "@reduxjs/toolkit";
import {
  DEFAULT_WINDOW_SETTINGS,
  DEFAULT_WINDOW_STATE,
  IWindow,
  TWindowState,
  WindowTypeEnum,
} from "./types";
import { evolve, mergeDeep } from "remeda";
import { merge } from "@/lib/merger/mergers";

export const accumulateWindowMinWidths = (windowList: IWindow[]) =>
  windowList.reduce((acc, w) => acc + w.settings.size.min, 0);

export const updateState = (window: IWindow) => {
  return evolve(window, {
    state: { timestamp: () => Date.now() },
  });
};

export function CreateBaseWindow(window: Partial<IWindow>) {
  return Object.merge(
    {
      id: nanoid(),
      type: WindowTypeEnum.None,
      state: DEFAULT_WINDOW_STATE,
      settings: DEFAULT_WINDOW_SETTINGS,
    },
    window
  ) as IWindow;
}

