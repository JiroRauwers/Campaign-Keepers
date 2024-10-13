import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface WorldOverviewProps {
  worldName: string;
  worldDescription: string;
  activeCampaigns: number;
  totalPlayers: number;
  totalCharacters: number;
}

export function WorldOverview({
  worldName,
  worldDescription,
  activeCampaigns,
  totalPlayers,
  totalCharacters,
}: WorldOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <Globe className="mr-2 text-primary" />
            World Overview
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{worldName}</h3>
        <p className="text-muted-foreground mb-4">{worldDescription}</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              Active Campaigns
            </div>
            <div className="text-3xl font-bold">{activeCampaigns}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Players</div>
            <div className="text-3xl font-bold">{totalPlayers}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              Total Characters
            </div>
            <div className="text-3xl font-bold">{totalCharacters}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
