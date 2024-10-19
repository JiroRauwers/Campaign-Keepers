import { useSortable } from "@dnd-kit/react/sortable";
import React, {
  FC,
  ForwardRefExoticComponent,
  PropsWithRef,
  RefAttributes,
  useMemo,
  useState,
} from "react";
import { CollisionPriority } from "@dnd-kit/abstract";

import { Blocks } from "./block";
import { Card } from "@/components/ui/card";

export type ItemProps = {
  id: string;
  data: any;
  config: any;
  identifier: string;
};

export function Item({
  index,
  column,
  ...data
}: ItemProps & { index: number; column: string }) {
  const [settings, setSettings] = useState<ItemProps>(data);

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
    data: settings,
  });

  const Component = useMemo(():
    | FC<ItemProps & RefAttributes<HTMLDivElement>>
    | undefined => {
    if (!settings.identifier || !(settings.identifier in Blocks))
      return undefined;
    return Blocks[settings.identifier];
  }, [settings.identifier]);

  if (!Component) return <Card>asd</Card>;

  return <Component ref={ref} {...settings} />;
}
