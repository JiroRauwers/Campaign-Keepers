"use client";

import { cn } from "@/lib/utils";
import { useCallback } from "react";

interface DotsProps {
  id: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  "data-path"?: string;
  readOnly?: boolean;
}

export function Dots({
  id,
  value = 0,
  min = 0,
  max = 5,
  onChange,
  className,
  "data-path": path,
  readOnly,
}: DotsProps) {
  const handleClick = useCallback(
    (index: number) => {
      if (readOnly || !onChange) return;

      const newValue = index + 1;
      // If clicking the same dot, decrease by 1 but not below min
      if (value === newValue) {
        onChange(Math.max(min, index));
      } else {
        // Otherwise set to the clicked dot
        onChange(Math.min(max, newValue));
      }
    },
    [value, onChange, min, max, readOnly]
  );

  // Ensure value is a number and within bounds
  const normalizedValue = Math.min(
    max,
    Math.max(min, typeof value === "number" ? value : min)
  );

  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: max }).map((_, index) => (
        <button
          key={`${id}-${index}`}
          type="button"
          onClick={() => handleClick(index)}
          className={cn("w-4 h-4 rounded-full border-2 transition-colors", {
            "border-gray-300 bg-gray-300": index < min,
            "border-gray-400 bg-gray-400":
              index >= min && index < normalizedValue,
            "border-gray-400 bg-transparent": index >= normalizedValue,
            "cursor-pointer hover:border-gray-600":
              !!onChange && !readOnly && index >= min,
            "cursor-default": !onChange || readOnly || index < min,
          })}
          aria-label={`Set ${id} to ${index + 1}`}
          disabled={readOnly || index < min}
        />
      ))}
    </div>
  );
}
