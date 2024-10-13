"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Campaign {
  id: number;
  name: string;
  active: boolean;
  nextSession: string | null;
}

interface CampaignsListProps {
  campaigns: Campaign[];
  sessionAttendance: Record<number, string[]>;
}

export function CampaignsList({
  campaigns,
  sessionAttendance,
}: CampaignsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Users className="mr-2" />
          Campaigns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Badge
                  variant={campaign.active ? "default" : "secondary"}
                  className="mr-2"
                >
                  {campaign.active ? "Active" : "Inactive"}
                </Badge>
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  {campaign.nextSession && (
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Next session: {campaign.nextSession}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {sessionAttendance[campaign.id] && (
                  <div className="flex -space-x-2">
                    {sessionAttendance[campaign.id].map((playerName, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Avatar className="w-6 h-6 border-2 border-primary">
                              <AvatarFallback>{playerName[0]}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{playerName} (Attending)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                )}
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          + Create New Campaign
        </Button>
      </CardContent>
    </Card>
  );
}
