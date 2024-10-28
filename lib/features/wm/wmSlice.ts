import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_WINDOW_SETTINGS,
  DEFAULT_WINDOW_STATE,
  ISliceInitialState,
  IWindow,
  WindowStateModeEnum,
  WindowTypeEnum,
} from "./types";
import {
  filter,
  find,
  isDefined,
  mergeDeep,
  pipe,
  setPath,
  when,
} from "remeda";
import { OnlyRequire } from "@/lib/types";
import assert from "assert";

const initialState: ISliceInitialState = {
  windows: [],
  edditMode: false,
};
type createWindowAction = PayloadAction<OnlyRequire<IWindow, "type">>;
type updateWindowAction = PayloadAction<OnlyRequire<IWindow, "id">>;
const wmSlice = createSlice({
  name: "wm",
  initialState,
  reducers: {
    setEditMode(state, action: PayloadAction<boolean> | undefined) {
      state.edditMode = action?.payload ?? !state.edditMode;
    },

    addWindow(state, action: createWindowAction) {
      assert(action.payload.type !== undefined, "Window `Type` is required");
      const wmWindow = pipe(
        {
          id: nanoid(),
          settings: DEFAULT_WINDOW_SETTINGS,
          state: DEFAULT_WINDOW_STATE,
          data: {},
          type: WindowTypeEnum.None,
        } satisfies IWindow,
        mergeDeep(action.payload)
      );
      assert(wmWindow.id !== undefined, "Window `Id` is required");
      // @ts-expect-error - we know (id) it's there
      state.windows.push(wmWindow);
    },
    updateWindow(state, action: updateWindowAction) {
      const window = find(state.windows, (w) => w.id === action.payload.id);
      assert(window !== undefined, "Window not found");
      pipe(window, mergeDeep(action.payload));
    },
    closeWindow(state, action: updateWindowAction) {
      filter(state.windows, (w) => w.id !== action.payload.id);
    },

    openWindow(state, action: updateWindowAction) {
      pipe(
        state.windows,
        find((w) => w.id === action.payload.id),
        // @ts-expect-error - Too deep, it's there
        when(isDefined, setPath(["state", "mode"], WindowStateModeEnum.Open))
      );
    },
  },
  selectors: {
    selectOpenWindows: (state) =>
      pipe(
        state.windows,
        filter((window) => window.state.mode === WindowStateModeEnum.Open)
      ),
    selectWindowById: (state, id: string) =>
      pipe(
        state.windows,
        find((window) => window.id === id)
      ),
  },
});

export const { addWindow, updateWindow, closeWindow, openWindow } =
  wmSlice.actions;

export default wmSlice.reducer;
