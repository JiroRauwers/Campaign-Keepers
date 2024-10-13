import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { format, parseISO } from "date-fns";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  participants: string[];
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const sortedEvents = [...events].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Clock className="mr-2 text-primary" />
          Campaign Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedEvents.length > 0 ? (
          <div className="relative">
            {sortedEvents.map((event, index) => (
              <div key={event.id} className="mb-8 flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  {index !== sortedEvents.length - 1 && (
                    <div className="w-0.5 flex-grow bg-muted" />
                  )}
                </div>
                <div className="flex-grow pb-8">
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <Badge variant={"secondary"}>
                    {format(parseISO(event.date), "MMMM d, yyyy")}
                  </Badge>
                  <p className="text-muted-foreground mb-2">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {event.participants.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            No past events to display.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
