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
  findIndex,
  isDefined,
  mergeDeep,
  pipe,
  setPath,
  when,
} from "remeda";
import { OnlyRequire } from "@/lib/types";
import assert from "assert";

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
type setNavigationWindowAction = PayloadAction<Partial<Omit<IWindow, "type">>>;

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

    setNavigationWindow(state, action: setNavigationWindowAction) {
      const index = findIndex(
        state.windows,
        (w) => w.id === "nav" && w.type === WindowTypeEnum.Navigation
      );
      if (index === -1) {
        state.windows.push({
          id: "nav",
          type: WindowTypeEnum.Navigation,
          settings: DEFAULT_WINDOW_SETTINGS,
          state: DEFAULT_WINDOW_STATE,
          data: {
            title: "Navigation",
          },
        });
      }
      state.windows[index] = pipe(
        {
          type: WindowTypeEnum.Navigation,
          settings: DEFAULT_WINDOW_SETTINGS,
          state: DEFAULT_WINDOW_STATE,
          data: {
            title: "Navigation",
          },
        },
        mergeDeep(state.windows[index]),
        mergeDeep(action.payload)
      ) as IWindow;
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
      const index = findIndex(state.windows, (w) => w.id === action.payload.id);
      assert(index !== -1, "Window not found");
      state.windows[index] = mergeDeep(
        state.windows[index],
        action.payload
      ) as IWindow;
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
  setNavigationWindow,
  addWindow,
  updateWindow,
  closeWindow,
  toggleWindowMode,
} = wmSlice.actions;

export default wmSlice.reducer;
