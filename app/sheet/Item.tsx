import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSensor, useSensors } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/react/sortable";
import React, { useEffect, useMemo, useState } from "react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
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
    accept: "item",
    group: column,
    feedback: "clone",
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          ref={ref}
          className={cn(
            "sheet-item",
            "w-auto h-auto",
            `col-${settings.colSpan}`,
            `row-${settings.rowSpan}`
          )}
        >
          {id}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Col span</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={() => setSettings({ ...settings, colSpan: "sm" })}
            >
              sm
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => setSettings({ ...settings, colSpan: "md" })}
            >
              md
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => setSettings({ ...settings, colSpan: "lg" })}
            >
              lg
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Row span</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={() => setSettings({ ...settings, rowSpan: "sm" })}
            >
              sm
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => setSettings({ ...settings, rowSpan: "md" })}
            >
              md
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => setSettings({ ...settings, rowSpan: "lg" })}
            >
              lg
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
