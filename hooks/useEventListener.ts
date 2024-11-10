import { useEffect } from "react";

export const useEventListener = (event: string, callback: () => void) => {
  useEffect(() => {
    window?.addEventListener(event, callback);

    return () => {
      window?.removeEventListener(event, callback);
    };
  }, [event, callback]);
};
