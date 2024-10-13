"use client";

import { useState } from "react";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { Timeline } from "@/components/campaign/Timeline";
import { PlayersList } from "@/components/campaign/PlayersList";
import { CharacterSheets } from "@/components/campaign/CharacterSheets";
import { NPCList } from "@/components/campaign/NPCList";
import { parseISO, isBefore } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CampaignEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  participants: string[];
}

interface CampaignPlayer {
  name: string;
  avatar: string;
  characters: string[];
  online: boolean;
}

interface CharacterSheet {
  name: string;
  player: string;
  class: string;
  level: number;
}

interface NPC {
  name: string;
  description: string;
  avatar: string;
}

interface CampaignDashboardProps {
  campaignName: string;
  campaignDescription: string;
  currentWorldDate: string;
  events: CampaignEvent[];
  players: CampaignPlayer[];
  characterSheets: CharacterSheet[];
  npcs: NPC[];
}

export function CampaignDashboard() {
  const [isNPCListOpen, setIsNPCListOpen] = useState(false);

  // Define sampleData within the component
  const sampleData: CampaignDashboardProps = {
    campaignName: "The Crystal Prophecy",
    campaignDescription:
      "In the mystical realm of Aethoria, where magic flows like rivers and ancient prophecies shape the fate of nations, a group of unlikely heroes finds themselves at the center of a cosmic struggle. The Crystal Prophecy, a millennia-old prediction, speaks of a time when the very fabric of reality will be threatened by the awakening of an ancient evil. As the stars align and omens appear across the land, our adventurers must navigate treacherous political landscapes, uncover long-lost artifacts, and face their own inner demons. From the glittering spires of the elven capital to the depths of forgotten dungeons, every step brings them closer to their destiny. But as they race against time to prevent the prophecy's dire warnings from coming true, they begin to question whether fate can truly be changed, or if their efforts are merely fulfilling the very prophecy they seek to prevent.",
    currentWorldDate: "15th of Sunhigh, 1023 AE",
    events: [
      {
        id: 1,
        title: "Prophecy Unveiled",
        date: "2023-09-01",
        description: "The Crystal Prophecy is discovered in ancient ruins",
        participants: ["Eldrin", "Lyra"],
      },
      {
        id: 2,
        title: "Party Formation",
        date: "2023-09-10",
        description: "The heroes meet and form their adventuring party",
        participants: ["Lyra", "Grok", "Aria", "Zephyr", "Nyx", "Flint"],
      },
      {
        id: 3,
        title: "First Encounter",
        date: "2023-09-15",
        description:
          "The party faces their first challenge against shadow creatures",
        participants: ["Lyra", "Grok", "Aria"],
      },
      {
        id: 4,
        title: "Ambush in Shadowwood",
        date: "2023-09-25",
        description: "Unexpected encounter with dark elves",
        participants: ["Grok", "Nyx", "Flint"],
      },
      {
        id: 5,
        title: "Airship Journey",
        date: "2023-10-05",
        description:
          "The party embarks on an airship voyage with Captain Stormbeard",
        participants: ["All"],
      },
      {
        id: 6,
        title: "Battle at Stormhaven",
        date: "2023-10-15",
        description: "Epic confrontation with the Storm Giants",
        participants: ["Lyra", "Grok", "Aria"],
      },
      {
        id: 7,
        title: "Exploration of Crystal Caves",
        date: "2023-10-18",
        description: "Delving into the mysterious Crystal Caves",
        participants: ["Zephyr", "Nyx", "Flint"],
      },
      {
        id: 8,
        title: "Council Meeting",
        date: "2023-10-22",
        description: "Strategic gathering of allies in Aethoria",
        participants: ["Lyra", "Aria", "Eldrin"],
      },
      {
        id: 9,
        title: "Ritual at Moonstone Temple",
        date: "2023-10-30",
        description: "Ancient ceremony to seal the rift",
        participants: ["Lyra", "Zephyr", "Aria", "Eldrin"],
      },
      {
        id: 10,
        title: "Final Confrontation",
        date: "2023-11-15",
        description: "The ultimate battle against the awakened ancient evil",
        participants: ["All"],
      },
    ],
    players: [
      {
        name: "Alice",
        avatar: "/placeholder.svg?height=40&width=40",
        characters: ["Lyra Moonshadow", "Zephyr Stormrider"],
        online: true,
      },
      {
        name: "Bob",
        avatar: "/placeholder.svg?height=40&width=40",
        characters: ["Grok Thunderfist"],
        online: false,
      },
      {
        name: "Charlie",
        avatar: "/placeholder.svg?height=40&width=40",
        characters: ["Aria Whisperwind", "Flint Ironfell"],
        online: true,
      },
      {
        name: "Diana",
        avatar: "/placeholder.svg?height=40&width=40",
        characters: ["Nyx Shadowblade"],
        online: false,
      },
    ],
    characterSheets: [
      { name: "Lyra Moonshadow", player: "Alice", class: "Rogue", level: 5 },
      { name: "Zephyr Stormrider", player: "Alice", class: "Wizard", level: 4 },
      { name: "Grok Thunderfist", player: "Bob", class: "Barbarian", level: 6 },
      { name: "Aria Whisperwind", player: "Charlie", class: "Bard", level: 3 },
      { name: "Flint Ironfell", player: "Charlie", class: "Fighter", level: 5 },
      { name: "Nyx Shadowblade", player: "Diana", class: "Assassin", level: 4 },
    ],
    npcs: [
      {
        name: "Eldrin the Sage",
        description:
          "Ancient elven lorekeeper with vast knowledge of the Crystal Prophecy",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Captain Stormbeard",
        description:
          "Gruff airship captain with a heart of gold and a ship that defies gravity",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Whisper",
        description:
          "Mysterious fey guide with shifting loyalties and cryptic advice",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  };

  const {
    campaignName,
    campaignDescription,
    currentWorldDate,
    events,
    players,
    characterSheets,
    npcs,
  } = sampleData;

  const filteredEvents = events.filter((event) =>
    isBefore(parseISO(event.date), parseISO("2023-10-20"))
  );

  // Mock data for the Navbar
  const currentPath = [
    "Worlds",
    "Aethoria",
    "Campaigns",
    "The Crystal Prophecy",
  ];
  const currentWorld = "Aethoria";
  const playerAvatar = "/placeholder.svg?height=32&width=32";
  const playerName = "Alice";

  return (
    <main className="flex-grow flex flex-col gap-6">
      <CampaignHeader
        campaignName={campaignName}
        campaignDescription={campaignDescription}
        currentWorldDate={currentWorldDate}
      />

      <NPCList npcs={npcs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Timeline events={filteredEvents} />
        </div>

        <div className="gap-6">
          <div className="lg:sticky lg:top-20">
            <PlayersList players={players} />
            <div className="h-6" /> {/* Spacer */}
            <CharacterSheets characterSheets={characterSheets} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CampaignDashboard;
