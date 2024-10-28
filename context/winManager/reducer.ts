import { IWindow, WindowAction } from "../../lib/features/wm/types";

export function WindowReducer(state: IWindow[], action: WindowAction) {
  switch (action.type) {
    case "add":
      return [...state, action.window];
    default:
      console.info("Unknown action", action);
      return state;
  }
}
