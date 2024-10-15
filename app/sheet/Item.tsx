import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import React, { useState } from "react";
import { CollisionPriority } from "@dnd-kit/abstract";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export type ItemProps = {
  id: string;
  rowSpan: "sm" | "md" | "lg";
  colSpan: "sm" | "md" | "lg";
};

export function Item({
  id,
  colSpan,
  rowSpan,
  index,
  column,
}: ItemProps & { index: number; column: string }) {
  const [settings, setSettings] = useState<ItemProps>({
    id,
    colSpan,
    rowSpan,
  });

  const { ref } = useSortable({
    id: settings.id,
    index,
    type: "item",
    transition: {
      duration: 300,
      easing: "ease-in-out",
    },
    collisionPriority: CollisionPriority.Highest,
    accept: "item",
    group: column,
    feedback: "clone",
    data: settings,
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={ref}
          className={cn(
            "sheet-item bg-card rounded-md p-3 border",
            `col-${settings.colSpan}`,
            `row-${settings.rowSpan}`
          )}
        >
          {id}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Col span</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {["sm", "md", "lg"].map((colSpan) => (
              <ContextMenuCheckboxItem
                key={colSpan}
                checked={settings.colSpan === colSpan}
                children={colSpan}
                onClick={() =>
                  setSettings({
                    ...settings,
                    colSpan: colSpan as "sm" | "md" | "lg",
                  })
                }
              />
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Row span</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {["sm", "md", "lg"].map((rowSpan) => (
              <ContextMenuCheckboxItem
                key={rowSpan}
                checked={settings.rowSpan === rowSpan}
                children={rowSpan}
                onClick={() =>
                  setSettings({
                    ...settings,
                    rowSpan: rowSpan as "sm" | "md" | "lg",
                  })
                }
              />
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
