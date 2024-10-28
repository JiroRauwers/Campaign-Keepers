import { IWindow } from "./types";

export const accumulateWindowMinWidths = (windowList: IWindow[]) =>
  windowList.reduce((acc, w) => acc + w.settings.size.min, 0);
