import { IWindow } from "../../lib/features/wm/types";

/**
 * Calculate the minimum total size of all windows
 * @param windows - The windows to calculate the size of
 * @returns The minimum total size of all windows
 */
export function CalculateWindowSize(windows: IWindow[]) {
  const total = windows.reduce((acc, win) => acc + win.settings.size.min, 0);
  return total;
}
