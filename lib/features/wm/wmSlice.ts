import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_WINDOW_SETTINGS,
  DEFAULT_WINDOW_STATE,
  ISliceInitialState,
  IWindow,
  WindowStateModeEnum,
  WindowTypeEnum,
} from "./types";
import { filter, find, pipe } from "remeda";
import { OnlyRequire } from "@/lib/types";
import assert from "assert";
import { CreateBaseWindow, updateState } from "./helpers";

const initialState: ISliceInitialState = {
  windows: [
    {
      id: "nav",
      type: WindowTypeEnum.Navigation,
      state: DEFAULT_WINDOW_STATE,
      settings: {
        ...DEFAULT_WINDOW_SETTINGS,
        priority: 100,
      },
      data: {
        title: "Navigation",
      },
    },
  ],
  edditMode: false,
};
type createWindowAction = PayloadAction<OnlyRequire<IWindow, "type">>;
type updateWindowAction = PayloadAction<OnlyRequire<IWindow, "id">>;
type changeNavigationWindow = PayloadAction<Partial<Omit<IWindow, "type">>>;

const wmSlice = createSlice({
  name: "wm",
  initialState,
  reducers: {
    clearState(state) {
      console.log("clearState");
      state.windows = initialState.windows;
      state.edditMode = initialState.edditMode;
    },
    setEditMode(state, action: PayloadAction<boolean> | undefined) {
      state.edditMode = action?.payload ?? !state.edditMode;
    },
    resetNavigationWindow(state) {
      state.windows[0] = updateState(initialState.windows[0]);
    },
    addWindow(state, action: createWindowAction) {
      if (
        action.payload.id &&
        find(state.windows, (w) => w.id === action.payload.id)
      )
        assert(false, "Window `Id` already exists");
      assert(action.payload.type !== undefined, "Window `Type` is required");

      const wmWindow = CreateBaseWindow(action.payload);
      assert(wmWindow.id !== undefined, "Window `Id` is required");
      state.windows.push(wmWindow);
    },

    updateWindowData(state, action: updateWindowAction) {
      const window = find(state.windows, (w) => w.id === action.payload.id);
      assert(window !== undefined, "Window not found");

      window.data = action.payload.data;
    },
    closeWindow(state, action: updateWindowAction) {
      filter(state.windows, (w) => w.id !== action.payload.id);
    },
    toggleWindowMode(
      state,
      action: updateWindowAction,
      force?: WindowStateModeEnum
    ) {
      pipe(
        state.windows,
        find((w) => w.id === action.payload.id),
        (w) => {
          if (w === undefined) return;
          w.state.mode =
            (force ?? w.state.mode === WindowStateModeEnum.Open)
              ? WindowStateModeEnum.Minimized
              : WindowStateModeEnum.Open;
        }
      );
    },
  },
});

export const {
  setEditMode,
  resetNavigationWindow,
  addWindow,
  updateWindowData,
  closeWindow,
  toggleWindowMode,
} = wmSlice.actions;

export default wmSlice.reducer;
