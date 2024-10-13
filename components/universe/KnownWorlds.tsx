"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface KnownWorldsProps {
  worlds: Tables[];
}

export function KnownWorlds({ worlds }: KnownWorldsProps) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="flex items-center gap-2">
          <Globe className="text-primary" />
          Known Worlds
        </CardTitle>
        <Button
          variant="outline"
          onClick={() => {
            router.push("/world/create");
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create World
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {worlds.map((world) => (
            <Card
              key={world.id}
              className="group bg-background flex flex-col border-border hover:bg-accent hover:cursor-pointer"
              onClick={() => {
                router.push(`/world/${world.world_id}`);
              }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  {world.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-2">
                <p className="text-sm text-muted-foreground mb-2">
                  {world.description}
                </p>
                <div className="flex">
                  <Badge
                    variant="secondary"
                    className="bg-muted group-hover:bg-background text-muted-foreground group-hover:text-accent-foreground"
                  >
                    2 Active Campaigns
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
