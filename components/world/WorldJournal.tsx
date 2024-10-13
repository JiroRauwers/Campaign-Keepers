"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Send, Pin, Tag, Calendar } from "lucide-react";

interface JournalEntry {
  id: number;
  worldDate: string; // New field for world-specific date
  createDate: string; // Renamed from 'date' to 'createDate' for clarity
  author: string;
  content: string;
  tags: string[];
  pinned: boolean;
  campaignId: number | null;
}

interface Campaign {
  id: number;
  name: string;
}

interface WorldJournalProps {
  journalEntries: JournalEntry[];
  campaigns: Campaign[];
  currentWorldYear: number; // New prop for the current world year
}

export function WorldJournal({
  journalEntries,
  campaigns,
  currentWorldYear,
}: WorldJournalProps) {
  const [journalEntry, setJournalEntry] = useState("");
  const [journalTags, setJournalTags] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [worldYear, setWorldYear] = useState(currentWorldYear.toString());
  const [worldMonth, setWorldMonth] = useState("1");
  const [worldDay, setWorldDay] = useState("1");

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new entry to your backend
    console.log("New journal entry:", journalEntry);
    console.log(
      "Tags:",
      journalTags.split(",").map((tag) => tag.trim())
    );
    console.log("Associated Campaign:", selectedCampaign);
    console.log(
      "World Date:",
      `${worldYear}-${worldMonth.padStart(2, "0")}-${worldDay.padStart(2, "0")}`
    );
    setJournalEntry("");
    setJournalTags("");
    setSelectedCampaign("");
    setWorldYear(currentWorldYear.toString());
    setWorldMonth("1");
    setWorldDay("1");
  };

  const togglePinned = (id: number) => {
    // Here you would typically update the pinned status in your backend
    console.log("Toggled pin for entry:", id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BookOpen className="mr-2" />
          World Journal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJournalSubmit} className="mb-4">
          <Textarea
            placeholder="Write a new journal entry..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="mb-2"
          />
          <div className="flex space-x-2 mb-2">
            <Input
              placeholder="Add tags (comma-separated)"
              value={journalTags}
              onChange={(e) => setJournalTags(e.target.value)}
            />
            <Select
              value={selectedCampaign}
              onValueChange={setSelectedCampaign}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Campaign</SelectItem>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id.toString()}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-x-2 mb-2">
            <Input
              type="number"
              placeholder="Year"
              value={worldYear}
              onChange={(e) => setWorldYear(e.target.value)}
              min="1"
              className="w-1/3"
            />
            <Input
              type="number"
              placeholder="Month"
              value={worldMonth}
              onChange={(e) => setWorldMonth(e.target.value)}
              min="1"
              max="12"
              className="w-1/3"
            />
            <Input
              type="number"
              placeholder="Day"
              value={worldDay}
              onChange={(e) => setWorldDay(e.target.value)}
              min="1"
              max="31"
              className="w-1/3"
            />
          </div>
          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" /> Post Entry
          </Button>
        </form>
        <div className="space-y-4">
          {journalEntries
            .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
            .map((entry) => (
              <div
                key={entry.id}
                className={`bg-background p-4 rounded-lg shadow border border-border ${entry.pinned ? "border-2 !border-primary/40" : ""}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{entry.author}</span>
                  <div className="flex items-center gap-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePinned(entry.id)}
                      className={
                        entry.pinned ? "text-primary" : "text-muted-foreground"
                      }
                    >
                      <Pin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2 flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span className="font-semibold mr-2">{entry.worldDate}</span>
                  <span className="text-xs">({entry.createDate})</span>
                </div>
                <p className="text-muted-foreground mb-2">{entry.content}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                {entry.campaignId && (
                  <div className="text-sm text-muted-foreground">
                    Campaign:{" "}
                    {campaigns.find((c) => c.id === entry.campaignId)?.name}
                  </div>
                )}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
