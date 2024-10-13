import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Shell } from "lucide-react";

interface UniverseInfoProps {
  name: string;
  totalWorlds: number;
  totalCampaigns: number;
  totalPlayers: number;
}

export function UniverseInfo({
  name,
  totalWorlds,
  totalCampaigns,
  totalPlayers,
}: UniverseInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shell className="mr-2 text-primary" />
          Known Universe Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-xl font-bold">{totalWorlds}</span>
            <Badge
              variant="secondary"
              className="bg-muted justify-center w-full text-muted-foreground"
            >
              Worlds
            </Badge>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-xl font-bold">{totalCampaigns}</span>
            <Badge
              variant="secondary"
              className="bg-muted justify-center w-full text-muted-foreground"
            >
              Campaigns
            </Badge>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-xl font-bold">{totalPlayers}</span>
            <Badge
              variant="secondary"
              className="bg-muted justify-center w-full text-muted-foreground"
            >
              Players
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
