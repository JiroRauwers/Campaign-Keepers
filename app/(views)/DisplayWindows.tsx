"use client";

import { useEventListener } from "@/hooks/useEventListener";
import { SheetProvider } from "@/hooks/useSheet/SheetContext";
import { useWm } from "@/hooks/useWm";
import Sheet from "@/layout/wmWindow/sheet";
import { WindowModeEnum, WindowTypeEnum } from "@/lib/features/wm/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useReducer, useState } from "react";

interface DisplayWindowsProps {
  mainWindowChild: React.ReactNode;
}

function maxheightReducer(_: number, v: number) {
  return v;
}

export default function DisplayWindows({
  mainWindowChild,
}: DisplayWindowsProps) {
  const { openWindows } = useWm();
  const [maxHeight, setMaxHeight] = useState(720);
  useEffect(() => {
    setMaxHeight(window?.innerHeight - 48 - 48 - 8);
  }, []);

  useEventListener("resize", () => {
    setMaxHeight(window?.innerHeight - 48 - 48 - 8);
  });

  return (
    <div className="flex justify-around p-4 gap-4 flex-1">
      <AnimatePresence mode="popLayout" presenceAffectsLayout>
        {openWindows.map((window) => (
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
              minWidth: window.settings.size.min,
              maxWidth: window.settings.size.max,
              maxHeight: maxHeight,
            }}
            className={cn(
              "rounded-md p-2 w-full bg-white overflow-auto dark:bg-neutral-800/10",
              window.settings.mode === WindowModeEnum.Floating &&
                "border dark:border-neutral-800 border-gray-200 bg-gray-100/50 dark:bg-neutral-800/50"
            )}
          >
            {window.type === WindowTypeEnum.Navigation
              ? mainWindowChild
              : window.data.title}

            {window.type === WindowTypeEnum.Sheet && (
              <SheetProvider id={window.id}>
                <Sheet {...window} />
              </SheetProvider>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
