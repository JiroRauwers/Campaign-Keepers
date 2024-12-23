"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tables } from "@/database.types";

export function CampaignHeader({
  campaign: { name, description, campaign_date },
}: {
  campaign: Tables<"campaigns">;
}) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="relative flex items-end pt-36  min-h-[300px] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/123/1920/1080"
          alt="Campaign banner"
          fill
          className="object-cover z-0 w-screen"
        />
        <div className="bg-gradient-to-b z-10 w-full from-transparent via-background/75 to-background">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {name}
            </h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <CalendarDays className="w-5 h-5 mr-2" />
              <span>{campaign_date}</span>
            </div>
            <div className={cn("mb-2", !isDescriptionOpen && "line-clamp-3")}>
              {description}
            </div>
            {description && description.length > 200 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                {isDescriptionOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" /> Read less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" /> Read more
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
