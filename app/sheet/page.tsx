"use client";
import { useState } from "react";
import { Column, ColumnProps } from "./Column";
  
export const dynamic = "force-dynamic";

export default function Sheet() {
  const [items, setItems] = useState<ColumnProps[]>([
    {
      id: "A",
      columnSize: "sm",
      items: [
        { id: "A1", rowSpan: "md", colSpan: "md" },
        { id: "A2", rowSpan: "sm", colSpan: "sm" },
        { id: "A3", rowSpan: "md", colSpan: "sm" },
        { id: "A4", rowSpan: "sm", colSpan: "md" },
        { id: "A5", rowSpan: "sm", colSpan: "lg" },
        { id: "A6", rowSpan: "sm", colSpan: "sm" },
        { id: "A7", rowSpan: "sm", colSpan: "sm" },
        { id: "A8", rowSpan: "sm", colSpan: "sm" },
      ],
    },
  ]);

  return (
    <div className="flex-1 flex p-4">
      {items.map((column) => {
        return <Column key={column.id} {...column} />;
      })}
      <div className="bg-red-300 p-4">asd</div>
    </div>
  );
}
