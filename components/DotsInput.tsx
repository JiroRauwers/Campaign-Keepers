"use client";

import { cn } from "@/lib/utils";
import { memo, useCallback, useMemo } from "react";

interface DotsProps {
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

const Dot = memo(function Dot({
  index,
  value,
  min,
  max,
  onClick,
  visibleMinimum,
}: {
  index: number;
  value: number;
  min: number;
  max: number;
  visibleMinimum: boolean;
  onClick: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className={cn("w-4 h-4 rounded-full border-2 transition-colors", {
        "border-gray-400 bg-gray-400": index < value,
        "border-gray-400 bg-transparent": index >= value,
        "border-gray-300 bg-gray-300": visibleMinimum && index < min,
        "cursor-pointer hover:border-gray-600": index >= min && index < max,
        "cursor-default": index < min || index >= max,
        "opacity-50": index >= max,
      })}
      aria-label={`Dot ${index + 1}`}
      disabled={index < min || index >= max}
    />
  );
});

export const Dots = memo(
  function Dots({
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
  }: DotsProps) {
    const handleClick = useCallback(
      (index: number) => {
        if (readOnly || !onChange) return;
        const newValue = index + 1;
        onChange(
          value === newValue ? Math.max(min, index) : Math.min(max, newValue)
        );
      },
      [value, onChange, min, max, readOnly]
    );

    const normalizedValue = useMemo(
      () =>
        Math.min(max, Math.max(min, typeof value === "number" ? value : min)),
      [max, min, value]
    );

    return (
      <div
        className={cn("flex gap-1", className)}
        data-path={path}
        suppressHydrationWarning
      >
        {Array.from({ length: showUpTo < max ? showUpTo : max }).map(
          (_, index) => (
            <Dot
              key={`${id}-${index}`}
              index={index}
              value={normalizedValue}
              min={min}
              max={max}
              visibleMinimum={visibleMinimum}
              onClick={handleClick}
            />
          )
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.min === nextProps.min &&
      prevProps.max === nextProps.max &&
      prevProps.readOnly === nextProps.readOnly &&
      prevProps.visibleMinimum === nextProps.visibleMinimum
    );
  }
);
