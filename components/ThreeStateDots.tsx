"use client";

import { cn } from "@/lib/utils";
import { memo, useCallback, useMemo } from "react";

export type ThreeState = 0 | 1 | 2;

interface ThreeStateDotsProps {
  id: string;
  value?: number;
  min?: number;
  max?: number;
  showUpTo?: number;
  visibleMinimum?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  "data-path"?: string;
  readOnly?: boolean;
}

export const ThreeStateDots = memo(function ThreeStateDots({
  id,
  value = 0,
  min = 0,
  max = 5,
  showUpTo = max,
  visibleMinimum = false,
  onChange,
  className,
  "data-path": path,
  readOnly,
}: ThreeStateDotsProps) {
  const handleClick = useCallback(
    (index: number) => {
      if (readOnly || !onChange) return;

      const currentState = Math.floor(value / Math.pow(10, index)) % 10;
      const newState = (currentState + 1) % 3;

      const newValue =
        value -
        currentState * Math.pow(10, index) +
        newState * Math.pow(10, index);
      onChange(newValue);
    },
    [value, onChange, readOnly]
  );

  return (
    <div
      className={cn("flex gap-1", className)}
      data-path={path}
      suppressHydrationWarning
    >
      {Array.from({ length: showUpTo }).map((_, index) => {
        const state = (Math.floor(value / Math.pow(10, index)) %
          10) as ThreeState;

        return (
          <button
            key={`${id}-${index}`}
            type="button"
            onClick={() => handleClick(index)}
            className={cn("w-4 h-4 border-2 transition-colors relative", {
              "border-gray-400 bg-transparent": state === 0,
              "border-gray-400": state > 0,
              "cursor-pointer hover:border-gray-600":
                !!onChange && !readOnly && index < max,
              "cursor-default": !onChange || readOnly || index >= max,
              "opacity-50": index >= max,

              "bg-gray-300": visibleMinimum && index < min,
            })}
            aria-label={`Set ${id} state ${index + 1}`}
            disabled={readOnly || index >= max}
          >
            {state === 1 && (
              <div
                className="absolute inset-0 bg-gray-400"
                style={{
                  clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                }}
              />
            )}
            {state === 2 && <div className="absolute inset-0 bg-gray-400" />}
          </button>
        );
      })}
    </div>
  );
});
