import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Player {
  name: string;
  avatar: string;
  characters: string[];
  online: boolean;
}

interface PlayersListProps {
  players: Player[];
}

export function PlayersList({ players }: PlayersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Players</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {players.map((player) => (
            <li key={player.name} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={player.avatar} alt={player.name} />
                <AvatarFallback>{player.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium">{player.name}</p>
                <p className="text-xs text-muted-foreground">
                  {player.characters.join(", ")}
                </p>
              </div>
              <Badge variant={player.online ? "default" : "secondary"}>
                {player.online ? "Online" : "Offline"}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
