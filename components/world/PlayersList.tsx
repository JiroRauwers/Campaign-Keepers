"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Tables } from "@/database.types";

interface Player {
  name: string;
  avatar: string;
  characters: string[];
  online: boolean;
}

interface PlayersListProps {
  players: Tables<"profiles">[];
}

export function PlayersList({ players }: PlayersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <User className="mr-2" />
            Players
          </span>
          <Button variant="outline" size="sm">
            Invite
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {players.map((player, index) => (
            <div key={index} className="flex items-start gap-x-3">
              <div className="relative">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage
                    src={player.avatar_url ?? ""}
                    alt={player.username ?? ""}
                  />
                  <AvatarFallback>{player.username?.[0] ?? ""}</AvatarFallback>
                </Avatar>
                {Math.random() > 0.5 && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-1 ring-white" />
                )}
              </div>
              <div>
                <div className="font-medium">{player.username}</div>
                <div className="text-sm text-muted-foreground">
                  {player.full_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
