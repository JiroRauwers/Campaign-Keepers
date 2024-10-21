"use client";
import { forwardRef, useState } from "react";
import { ItemProps } from "../Item";
import { Input } from "@/components/ui/input";
import { Circle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Attributes = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, data, config, identifier }, ref) => {
    const [settings, setSettings] = useState<ItemProps>(data);

    return (
      <Card ref={ref} className="select-none p-3">
        <CardTitle className="text-center">Attributes</CardTitle>

        <CardContent className="grid grid-cols-1 grid-rows-[10fr_auto_10fr_auto_10fr] lg:grid-cols-[10fr_auto_10fr_auto_10fr] md:p-2 md:gap-2 gap-6 w-full">
          <div className="flex flex-col gap-4">
            <div className="text-2xl text-center pb-2 lg:pb-6 font-bold">
              Physical
            </div>
            <Attribute name="Strength" value={10} />
            <Attribute name="Dexterity" value={10} />
            <Attribute name="Constitution" value={10} />
          </div>
          <Separator className="h-[2px] w-full md:h-full md:w-[2px]" />
          <div className="flex flex-col gap-4">
            <div className="text-2xl text-center pb-2 lg:pb-6 font-bold">
              Social
            </div>
            <Attribute name="Charisma" value={10} />
            <Attribute name="Manipulation" value={10} />
            <Attribute name="composure" value={10} />
          </div>
          <Separator className="h-[2px] w-full md:h-full md:w-[2px]" />
          <div className="flex flex-col gap-4">
            <div className="text-2xl text-center pb-2 lg:pb-6 font-bold">
              Mental
            </div>
            <Attribute name="intelligence" value={10} />
            <Attribute name="wits" value={10} />
            <Attribute name="resolve" value={10} />
          </div>
        </CardContent>
      </Card>
    );
  }
);

function Attribute({ name, value }: { name: string; value: number }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2">
      <div className="capitalize font-bold">{name}</div>
      <FiveCircle />
    </div>
  );
}

function FiveCircle() {
  return (
    <div className="flex gap-2">
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
    </div>
  );
}
