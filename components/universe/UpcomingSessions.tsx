"use client";

import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, Users } from "lucide-react";

interface Session {
  id: string;
  campaignName: string;
  date: string; // datetime string
  players: string[];
}

interface UpcomingSessionsProps {
  sessions: Session[];
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  const isUpcoming = useMemo(() => {
    return (date: Date) => {
      const diffInHours =
        (date.getTime() - new Date().getTime()) / (1000 * 60 * 60);
      return diffInHours > -1 && diffInHours <= 24;
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1">
          {sessions.map((session) => (
            <li
              key={session.id}
              className={cn(
                "border-b border-border last:border-b-0 last:pb-0 px-4 py-2",
                isUpcoming(new Date(session.date)) && "bg-muted rounded-md"
              )}
            >
              <h3
                className={cn(
                  "font-semibold text-foreground",
                  isUpcoming(new Date(session.date)) && "text-primary"
                )}
              >
                {session.campaignName}
              </h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>
                  {new Date(session.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground mt-1">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  {new Date(session.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground mt-1">
                <Users className="w-4 h-4 mr-2" />
                <span>{session.players.join(", ")}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
