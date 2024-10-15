import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { cn } from "@/lib/utils";
import { Item, ItemProps } from "./Item";
import "./sheet.css";

export type ColumnProps = {
  id: string;
  columnSize: "sm" | "md" | "lg";
  items: ItemProps[];
};

export function Column({ id, columnSize, items }: ColumnProps) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "sheet-column",
        "grid border w-fit p-4 rounded-lg gap-2",
        columnSize
      )}
    >
      {items.map((item, index) => (
        <Item key={item.id} {...{ ...item, index }} column={id} />
      ))}
    </div>
  );
}
