"use client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortableItem";

export const dynamic = "force-dynamic";

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

interface Item {
  id: string;
  identifier: string;
  data: Record<string, unknown>;
  config: ItemConfig;
}

export default function Sheet() {
  const [items, setItems] = useState<
    Array<{ id: string; columnSize: string; items: Item[] }>
  >(() => [
    {
      id: "A",
      columnSize: "lg",
      items: [
        {
          id: "A1",
          identifier: "attributes",
          data: {},
          config: {
            colSpan: { current: 2, min: 1, max: 4 },
            rowSpan: { current: 1, min: 1, max: 2 },
          },
        },
        {
          id: "A2",
          identifier: "skills",
          data: {},
          config: {
            colSpan: { current: 1, min: 1, max: 2 },
            rowSpan: { current: 1, min: 1, max: 2 },
          },
        },
        {
          id: "A3",
          identifier: "notes",
          data: {},
          config: {
            colSpan: { current: 3, min: 1, max: 4 },
            rowSpan: { current: 1, min: 1, max: 3 },
          },
        },
        {
          id: "A4",
          identifier: "inventory",
          data: {},
          config: {
            colSpan: { current: 2, min: 1, max: 3 },
            rowSpan: { current: 1, min: 1, max: 2 },
          },
        },
      ],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items[0].items.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = items[0].items.findIndex(
          (item) => item.id === over!.id
        );

        return [
          {
            ...items[0],
            items: arrayMove(items[0].items, oldIndex, newIndex),
          },
        ];
      });
    }
  }

  function getColumnClass(columnSize: string) {
    switch (columnSize) {
      case "sm":
        return "grid-cols-2";
      case "md":
        return "grid-cols-3";
      case "lg":
        return "grid-cols-4";
      default:
        return "grid-cols-1";
    }
  }

  const handleConfigChange = (id: string, newConfig: ItemConfig) => {
    setItems((prevItems) => {
      return prevItems.map((column) => ({
        ...column,
        items: column.items.map((item) =>
          item.id === id ? { ...item, config: newConfig } : item
        ),
      }));
    });
  };

  return (
    <div className="flex-1 flex p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div
          className={`grid w-full p-4 border-card border rounded-md gap-4 ${getColumnClass(items[0].columnSize)}`}
        >
          <SortableContext
            items={items[0].items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items[0].items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                identifier={item.identifier}
                config={item.config}
                onConfigChange={handleConfigChange}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
