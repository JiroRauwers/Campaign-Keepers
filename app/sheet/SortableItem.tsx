import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ItemConfig {
  colSpan: {
    current: number;
    min: number;
    max: number;
  };
  rowSpan: {
    current: number;
    min: number;
    max: number;
  };
}

interface SortableItemProps {
  id: string;
  identifier: string;
  config: ItemConfig;
  onConfigChange: (id: string, newConfig: ItemConfig) => void;
}

export function SortableItem({
  id,
  identifier,
  config,
  onConfigChange,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [previewConfig, setPreviewConfig] = useState(config);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: `span ${previewConfig.colSpan.current}`,
    gridRow: `span ${previewConfig.rowSpan.current}`,
  };

  const handleSpanChange = (type: "colSpan" | "rowSpan", value: number) => {
    const newConfig = {
      ...previewConfig,
      [type]: {
        ...previewConfig[type],
        current: Math.max(
          previewConfig[type].min,
          Math.min(previewConfig[type].max, value)
        ),
      },
    };
    setPreviewConfig(newConfig);
  };

  const applyChanges = () => {
    onConfigChange(id, previewConfig);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-card shadow rounded"
    >
      <h3 className="font-bold">{identifier}</h3>
      <p>ID: {id}</p>
      <div>
        <label>
          Col Span:
          <input
            type="number"
            value={previewConfig.colSpan.current}
            min={previewConfig.colSpan.min}
            max={previewConfig.colSpan.max}
            onChange={(e) =>
              handleSpanChange("colSpan", parseInt(e.target.value))
            }
          />
          (Min: {previewConfig.colSpan.min}, Max: {previewConfig.colSpan.max})
        </label>
      </div>
      <div>
        <label>
          Row Span:
          <input
            type="number"
            value={previewConfig.rowSpan.current}
            min={previewConfig.rowSpan.min}
            max={previewConfig.rowSpan.max}
            onChange={(e) =>
              handleSpanChange("rowSpan", parseInt(e.target.value))
            }
          />
          (Min: {previewConfig.rowSpan.min}, Max: {previewConfig.rowSpan.max})
        </label>
      </div>
      <button
        onClick={applyChanges}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
      >
        Apply Changes
      </button>
    </div>
  );
}
