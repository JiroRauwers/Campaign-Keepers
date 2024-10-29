import { nanoid } from "@reduxjs/toolkit";
import {
  DEFAULT_WINDOW_SETTINGS,
  DEFAULT_WINDOW_STATE,
  IWindow,
  TWindowState,
  WindowTypeEnum,
} from "./types";
import { evolve, mergeDeep } from "remeda";

export const accumulateWindowMinWidths = (windowList: IWindow[]) =>
  windowList.reduce((acc, w) => acc + w.settings.size.min, 0);

export const updateState = (window: IWindow) => {
  return evolve(window, {
    state: { timestamp: () => Date.now() },
  });
};

export function CreateBaseWindow(window: Partial<IWindow>) {
  return {
    id: nanoid(),
    type: WindowTypeEnum.None,
    ...window,
    data: { ...window.data },
    state: {
      ...DEFAULT_WINDOW_STATE,
      ...window.state,
    },
    settings: { ...DEFAULT_WINDOW_SETTINGS, ...window.settings },
  };
}

function recursiveMerge(target: any, source: any) {
  return mergeDeep(target, source);
}
