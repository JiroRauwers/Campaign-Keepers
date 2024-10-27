"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ManagedWindow, useWindowContext } from "./windowContext";
import { AppWindowMac } from "lucide-react";

export const WindowManagerDock = () => {
  return (
    <>
      <FloatingDockDesktop className={""} />
      <FloatingDockMobile className={""} />
    </>
  );
};

const FloatingDockMobile = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const { toggleWindow, windows, mainWindow } = useWindowContext();

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {[mainWindow, ...windows].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (windows.length - 1 - idx) * 0.05 }}
              >
                <button
                  key={item.id}
                  onClick={() => toggleWindow(item)}
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">
                    <AppWindowMac />
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ className }: { className?: string }) => {
  let mouseX = useMotionValue(Infinity);
  const { windows, mainWindow, openWindows } = useWindowContext();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      <IconContainer
        mouseX={mouseX}
        isOpen={openWindows.some(
          (openWindow) => openWindow.id === mainWindow.id
        )}
        key={mainWindow.id}
        window={mainWindow}
      />
      {windows.map((item) => (
        <IconContainer
          mouseX={mouseX}
          isOpen={openWindows.some((openWindow) => openWindow.id === item.id)}
          key={item.id}
          window={item}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  isOpen,
  window,
}: {
  mouseX: MotionValue;
  window: ManagedWindow;
  isOpen: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const { toggleWindow } = useWindowContext();
  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => toggleWindow(window)}
      className={cn(
        "aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
        // isOpen && "border-2 border-primary"
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {window.title}
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <motion.div
          className="bg-primary size-1.5 rounded-full -bottom-2.5 absolute"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        />
      )}
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        <AppWindowMac />
      </motion.div>
    </motion.div>
  );
  // </Link>
}
