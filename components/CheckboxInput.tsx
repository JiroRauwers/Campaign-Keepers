"use client";

import { cn } from "@/lib/utils";
import { useCallback } from "react";

export type CheckboxState = 0 | 1 | 2; // 0 = empty, 1 = half, 2 = full

interface CheckboxProps {
  id: string;
  state?: CheckboxState;
  onChange?: (state: CheckboxState) => void;
  className?: string;
  "data-path"?: string;
}

export function Checkbox({
  id,
  state = 0,
  onChange,
  className,
  "data-path": path,
}: CheckboxProps) {
  const handleClick = useCallback(() => {
    // Cycle through states: 0 -> 1 -> 2 -> 0
    const nextState = ((state + 1) % 3) as CheckboxState;
    console.log(`Updating ${path} to ${nextState}`);
    if (!onChange) return;
    onChange(nextState);
  }, [state, onChange, path]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-4 h-4 border-2 border-gray-400 transition-colors relative",
        {
          "bg-transparent": state === 0,
          "bg-gray-400": state === 2,
          "cursor-pointer hover:border-gray-600": !!onChange,
          "cursor-default": !onChange,
        },
        className
      )}
      aria-label={`Toggle ${id}`}
      aria-checked={state === 2}
      role="checkbox"
    >
      {state === 1 && (
        <div
          className="absolute inset-0 bg-gray-400 m-[2px]"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        />
      )}
    </button>
  );
}
