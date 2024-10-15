"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tables } from "@/database.types";

interface AllSheetsProps {
  sheets: Tables<"sheets">[];
}

export function AllSheets({ sheets }: AllSheetsProps) {
  const [view, setView] = useState<"card" | "table">("card");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredSheets = sheets
    .filter((sheet) =>
      sheet.character_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (sheet) =>
        filter === "all" ||
        (filter === "assigned" && sheet.player_name) ||
        (filter === "unassigned" && !sheet.player_name)
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <User className="mr-2" />
            All Sheets
          </span>
          <Button variant="outline" size="sm">
            Create Character
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Input
              placeholder="Search sheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto flex-1"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sheets</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-x-2">
              <Button
                variant={view === "card" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("card")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {view === "card" ? (
          <div className="flex flex-wrap gap-4">
            {filteredSheets.map((sheet, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-1 group select-none flex-col bg-background overflow-hidden",
                  "border border-border rounded-lg aspect-square shadow hover:bg-muted/50 transition-colors cursor-pointer",
                  sheet.player_name ? "" : "opacity-50 hover:opacity-100"
                )}
              >
                <div className="flex-1 w-full relative">
                  <Image
                    src={`https://picsum.photos/seed/${sheet.character_name}/200`}
                    alt={sheet.character_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col px-3 pt-2 pb-2">
                  <div className="font-medium truncate">
                    {sheet.character_name}
                  </div>
                  <div
                    className={cn(
                      "text-sm text-muted-foreground truncate",
                      sheet.player_name ? "" : "text-transparent"
                    )}
                  >
                    {sheet.player_name ? sheet.player_name : "Unassigned"}
                  </div>
                  {/* <div className="text-sm text-muted-foreground truncate">
                    {sheet.class} - Level {sheet.level}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Player</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSheets.map((sheet, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {sheet.character_name}
                    </TableCell>
                    <TableCell>{sheet.player_name || "Unassigned"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
