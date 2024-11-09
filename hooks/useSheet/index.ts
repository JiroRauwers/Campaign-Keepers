import { useEffect } from "react";
import { useWm, useWmWindow } from "../useWm";
import { _useSheetId } from "./SheetContext";
import { useSupabase } from "../useSupabase";

export const useSheet = () => {
  const { id } = _useSheetId();
  const { wmWindow } = useWmWindow(id);

  return { wmWindow };
};
