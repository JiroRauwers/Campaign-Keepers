"use client";

import { cn } from "@/lib/utils";
import { useWindowContext, WindowType } from "./windowContext";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface DisplayWindowsProps {
  mainWindowChild: React.ReactNode;
}

export default function DisplayWindows({
  mainWindowChild,
}: DisplayWindowsProps) {
  const { getOpenWindows } = useWindowContext();

  const maxHeight = useMemo(() => {
    return window.innerHeight - 48 - 48 - 8;
  }, []);

  return (
    <div className="flex justify-around p-4 gap-4 flex-1">
      <AnimatePresence mode="popLayout" presenceAffectsLayout>
        {getOpenWindows.map((window) => (
          <motion.div
            key={window.id}
            layoutId={window.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{
              transition: {
                delay: 0.2,
              },
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              minWidth: window.size.min,
              maxWidth: window.size.max,
              maxHeight: maxHeight,
            }}
            className={cn(
              "rounded-md p-2 w-full bg-white overflow-auto dark:bg-neutral-800/10",
              window.type === WindowType.Floating &&
                "border dark:border-neutral-800 border-gray-200 bg-gray-100/50 dark:bg-neutral-800/50"
            )}
          >
            {window.id === "main" ? mainWindowChild : window.title}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
