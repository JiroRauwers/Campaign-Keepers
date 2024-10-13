"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface NPC {
  name: string;
  description: string;
  avatar: string;
}

interface NPCListProps {
  npcs: NPC[];
}

export function NPCList({ npcs }: NPCListProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              Important NPCs
              <div className="ml-auto text-foreground">
                {isOpen ? (
                  <ChevronUp className="size-6" />
                ) : (
                  <ChevronDown className="size-6" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <ul className="flex flex-col gap-y-4">
              {npcs.map((npc) => (
                <li key={npc.name} className="flex items-center gap-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={npc.avatar} alt={npc.name} />
                    <AvatarFallback>{npc.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{npc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {npc.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
