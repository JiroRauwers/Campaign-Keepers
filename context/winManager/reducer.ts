import { Window, WindowAction } from "./types";

export function WindowReducer(state: Window[], action: WindowAction) {
  switch (action.type) {
    case "add":
      return [...state, action.window];
    default:
      console.info("Unknown action", action);
      return state;
  }
}
