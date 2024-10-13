import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CharacterSheet {
  name: string;
  player: string;
  class: string;
  level: number;
}

interface CharacterSheetsProps {
  characterSheets: CharacterSheet[];
}

export function CharacterSheets({ characterSheets }: CharacterSheetsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Character Sheets</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {characterSheets.map((sheet) => (
            <li key={sheet.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{sheet.name}</p>
                <p className="text-xs text-muted-foreground">{sheet.player}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{sheet.class}</Badge>
                <Badge variant={"secondary"}>Lvl {sheet.level}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
