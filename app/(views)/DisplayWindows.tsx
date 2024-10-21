"use client";

import { cn } from "@/lib/utils";
import { useWindowContext, WindowType } from "./windowContext";
import { AnimatePresence, motion } from "framer-motion";

export default function DisplayWindows() {
  const { getOpenWindows } = useWindowContext();
  return (
    <div className="flex justify-around p-4 gap-4 flex-1">
      <AnimatePresence>
        {getOpenWindows.map((window) => (
          <motion.div
            key={window.id}
            layoutId={window.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              minWidth: window.size.min,
              maxWidth: window.size.max,
            }}
            className={cn(
              "rounded-md p-2 w-full bg-white dark:bg-neutral-800/10",
              window.type === WindowType.Floating &&
                "border dark:border-neutral-800 border-gray-200 bg-gray-100/50 dark:bg-neutral-800/50"
            )}
          >
            {window.title}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
