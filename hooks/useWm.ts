import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { clone, filter, find, isDeepEqual, mergeDeep, pipe } from "remeda";
import {
  IWindow,
  WindowStateModeEnum,
  WindowTypeEnum,
} from "@/lib/features/wm/types";
import { setNavigationWindow } from "@/lib/features/wm/wmSlice";
import { deepEqual } from "assert";

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

export const useWmNavWindow = (
  data?: any,
  extra?: Partial<Omit<IWindow, "data">>
) => {
  const { windows } = useWm();

  const dispatch = useAppDispatch();

  const navigationWindow = useMemo(
    () => find(windows, (window) => window.id === "nav"),
    [windows]
  );

  const dataRef = useRef(data);
  const extraRef = useRef(extra);

  useEffect(() => {
    if (!navigationWindow) return;

    dispatch(
      setNavigationWindow({
        ...extraRef.current,
        state: {
          mode: WindowStateModeEnum.Open,
          timestamp: Date.now(),
          ...extraRef.current?.state,
        },
        data: dataRef.current,
      })
    );
  }, [dataRef.current, extraRef.current]);

  return navigationWindow;
};
