"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";

interface KnownWorldsProps {
  worlds: Tables<"worlds">[];
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
        <div className="flex flex-wrap  gap-4">
          {worlds.map((world) => (
            <Card
              key={world.world_id}
              className="group bg-background flex flex-col border-border hover:bg-accent hover:cursor-pointer"
              onClick={() => {
                router.push(`/universe/${world.world_id}`);
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
          {worlds.length === 0 && (
            <div className="flex w-full flex-col items-center justify-center h-full gap-4">
              <p className="text-sm text-muted-foreground">
                No worlds found. Create one to get started!
              </p>
              <Button
                onClick={() => {
                  router.push("/world/create");
                }}
              >
                Create World
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
