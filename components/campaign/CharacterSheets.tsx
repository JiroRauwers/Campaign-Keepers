import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/database.types";

interface CharacterSheet {
  name: string;
  player: string;
  class: string;
  level: number;
}

interface CharacterSheetsProps {
  sheets: (Tables<"sheets"> & { profiles: Tables<"profiles">[] })[];
}

export function CharacterSheets({ sheets = [] }: CharacterSheetsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Character Sheets</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sheets.map((sheet) => (
            <li
              key={sheet.sheet_id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">{sheet.character_name}</p>
                <p className="text-xs text-muted-foreground">
                  {sheet.profiles.map((p) => p.username).join(", ") ||
                    "Unassigned"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{sheet.type}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
