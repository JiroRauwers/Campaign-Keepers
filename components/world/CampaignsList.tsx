"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  BadgeAlert,
  BadgePlus,
  BadgeMinus,
} from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tables } from "@/database.types";
import { cn } from "@/lib/utils";
import { formatDateWithTime } from "@/lib/format";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { concat, conditional, filter, map, pipe, piped } from "remeda";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CampaignsListProps {
  campaigns: Tables<"campaigns">[];
  sessionAttendance: Record<string, string[]>;
  disableUpdates?: boolean;
  worldId: string;
}

export function CampaignsList({
  campaigns: initialCampaigns,
  sessionAttendance,
  disableUpdates,
  worldId,
}: CampaignsListProps) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const router = useRouter();

  useEffect(() => {
    if (disableUpdates) return;

    const supabase = createClient();
    const channel = supabase.channel("campaigns-channel");

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "campaigns",
        },
        (payload) => {
          switch (payload.eventType) {
            case "UPDATE":
              toast.info(`Campaign ${payload.new.name} updated`, {
                icon: <BadgeAlert />,
                action: {
                  label: "View",
                  onClick: () => {
                    router.push(
                      `/world/${payload.new.worldId}/campaign/${payload.new.campaign_id}`
                    );
                  },
                },
              });
              if (payload.new.world_id !== worldId) return;
              setCampaigns(
                piped(
                  map((campaign) =>
                    campaign.campaign_id === payload.new.campaign_id
                      ? (payload.new as Tables<"campaigns">)
                      : campaign
                  )
                )
              );
              break;

            case "INSERT":
              toast.info(`New campaign ${payload.new.name} created`, {
                icon: <BadgePlus />,
                action: {
                  label: "View",
                  onClick: () => {
                    router.push(
                      `/world/${payload.new.worldId}/campaign/${payload.new.campaign_id}`
                    );
                  },
                },
              });
              if (payload.new.world_id !== worldId) return;
              setCampaigns(concat([payload.new as Tables<"campaigns">]));
              break;

            case "DELETE":
              toast.info(`Campaign ${payload.old.name} deleted`, {
                icon: <BadgeMinus />,
              });
              setCampaigns(
                filter(
                  (campaign) => campaign.campaign_id !== payload.old.campaign_id
                )
              );
              break;

            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [disableUpdates]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Users className="mr-2" />
          Campaigns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="gap-2 flex flex-col">
          {campaigns.map((campaign) => (
            <div
              key={campaign.campaign_id}
              className={cn(
                "flex items-center justify-between rounded-md",
                "p-2 ",
                "hover:bg-accent/50 transition-colors duration-200"
              )}
            >
              <div className="flex items-center">
                <Badge
                  // variant={campaign.active ? "default" : "secondary"}
                  className="mr-2"
                >
                  Active
                  {/* {campaign.active ? "Active" : "Inactive"} */}
                </Badge>
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  {/* {campaign.nextSession && ( */}
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    Next session: {formatDateWithTime(campaign.campaign_date)}
                  </div>
                  {/* )} */}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {sessionAttendance[campaign.campaign_id] && (
                  <div className="flex -space-x-2">
                    {sessionAttendance[campaign.campaign_id].map(
                      (playerName, index) => (
                        <TooltipProvider key={index}>
                          <TooltipRoot>
                            <TooltipTrigger>
                              <Avatar className="w-6 h-6 border-2 border-primary">
                                <AvatarFallback>{playerName[0]}</AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{playerName} (Attending)</p>
                            </TooltipContent>
                          </TooltipRoot>
                        </TooltipProvider>
                      )
                    )}
                  </div>
                )}
                <Button
                  variant="outline"
                  className="hover:bg-primary"
                  size="sm"
                  asChild
                >
                  <Link href={`/universe/${worldId}/${campaign.campaign_id}`}>
                    View
                  </Link>
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
