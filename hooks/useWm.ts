import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { clone, filter, find, isDeepEqual, mergeDeep, pipe } from "remeda";
import {
  IWindow,
  TWindowState,
  WindowStateModeEnum,
  WindowTypeEnum,
} from "@/lib/features/wm/types";
import { resetNavigationWindow, updateWindow } from "@/lib/features/wm/wmSlice";

export const useWm = () => {
  const { windows: _windows, edditMode } = useAppSelector((state) => state.wm);
  const openWindows = useMemo(
    () =>
      filter(
        _windows,
        (window) => window.state.mode === WindowStateModeEnum.Open
      ),
    [_windows]
  );
  const windows = useMemo(
    () =>
      filter(
        _windows,
        (window) => window.state.mode !== WindowStateModeEnum.Stacked
      ),
    [_windows]
  );

  return {
    windows,
    openWindows,
    edditMode,
  };
};

export const useWmNavWindow = (_data?: any, _state?: TWindowState) => {
  const { windows } = useWm();

  const dispatch = useAppDispatch();

  const navigationWindow = useMemo(
    () => find(windows, (window) => window.id === "nav"),
    [windows]
  );

  const data = useMemo(() => _data ?? {}, [_data]);
  const state = useMemo(() => _state, [_state]);

  useEffect(() => {
    function updateNavigationWindow() {
      dispatch(resetNavigationWindow());
      dispatch(updateWindow({ id: "nav", data, state }));
    }

    if (!navigationWindow) return updateNavigationWindow();
    if (isDeepEqual(data, navigationWindow.data))
      return updateNavigationWindow();
    if (isDeepEqual(state?.mode, navigationWindow.state.mode))
      return updateNavigationWindow();
  }, [data, state]);

  return navigationWindow;
};

export const useWmWindow = (id: string | null) => {
  const { windows } = useWm();
  const wmWindow = useMemo(
    () => find(windows, (window) => window.id === id),
    [windows, id]
  );

  return { wmWindow };
};
