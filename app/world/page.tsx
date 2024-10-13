// import { Header } from "@/components/world/Header";
import { WorldOverview } from "@/components/world/WorldOverview";
import { CampaignsList } from "@/components/world/CampaignsList";
import { WorldJournal } from "@/components/world/WorldJournal";
import { PlayersList } from "@/components/world/PlayersList";
import { AllSheets } from "@/components/world/AllSheets";

export default function WorldDashboard() {
  const worldName = "Aethoria";
  const worldDescription =
    "A world of floating islands and sky pirates, where magic and technology intertwine. The inhabitants navigate vast expanses of open sky, trading, exploring, and occasionally clashing with rival factions. Ancient ruins from a long-lost civilization dot the landscape, holding secrets waiting to be uncovered.";
  const currentWorldYear = 1023; // Example current world year

  const campaigns = [
    {
      id: 1,
      name: "Crystal Prophecy",
      active: true,
      nextSession: "Today, 8 PM",
    },
    {
      id: 2,
      name: "Sky Pirate's Revenge",
      active: true,
      nextSession: "Next Tue, 7 PM",
    },
    { id: 3, name: "Lost City of Clouds", active: false, nextSession: null },
  ];

  const players = [
    {
      name: "Alice",
      avatar: "/placeholder-user.jpg",
      characters: ["Lyra Moonshadow", "Zephyr Stormrider"],
      online: true,
    },
    {
      name: "Bob",
      avatar: "/placeholder-user.jpg",
      characters: ["Grok Thunderfist"],
      online: false,
    },
    {
      name: "Charlie",
      avatar: "/placeholder-user.jpg",
      characters: ["Aria Whisperwind", "Flint Ironfell"],
      online: true,
    },
    {
      name: "Diana",
      avatar: "/placeholder-user.jpg",
      characters: ["Nyx Shadowblade"],
      online: false,
    },
  ];

  const allSheets = [
    { name: "Lyra Moonshadow", player: "Alice", class: "Rogue", level: 5 },
    { name: "Zephyr Stormrider", player: "Alice", class: "Wizard", level: 4 },
    { name: "Grok Thunderfist", player: "Bob", class: "Barbarian", level: 6 },
    { name: "Aria Whisperwind", player: "Charlie", class: "Bard", level: 3 },
    { name: "Flint Ironfell", player: "Charlie", class: "Fighter", level: 5 },
    { name: "Nyx Shadowblade", player: "Diana", class: "Assassin", level: 4 },
    { name: "Eldrin Moonwhisper", player: null, class: "Druid", level: 2 },
    { name: "Thorne Ironheart", player: null, class: "Paladin", level: 3 },
    { name: "Seraphina Cloudwalker", player: null, class: "Monk", level: 1 },
  ];

  const journalEntries = [
    {
      id: 1,
      worldDate: "1023-10-15",
      createDate: "2024-10-11",
      author: "Storyteller",
      content:
        "The floating islands of Aethoria were first discovered by the legendary explorer, Captain Zephyr Windwhisper.",
      tags: ["history", "discovery"],
      pinned: true,
      campaignId: null,
    },
    {
      id: 2,
      worldDate: "1023-10-14",
      createDate: "2024-10-10",
      author: "Alice",
      content:
        "Lyra Moonshadow successfully infiltrated the Sky Pirate's hideout, uncovering a map to the fabled Crystal Caves.",
      tags: ["adventure", "crystal-prophecy"],
      pinned: false,
      campaignId: 1,
    },
    {
      id: 3,
      worldDate: "1023-10-13",
      createDate: "2024-10-09",
      author: "Bob",
      content:
        "Grok Thunderfist's mighty roar scared off a flock of razor-winged skyfish, saving the party from certain doom.",
      tags: ["combat", "sky-pirates-revenge"],
      pinned: false,
      campaignId: 2,
    },
    {
      id: 4,
      worldDate: "1023-10-12",
      createDate: "2024-10-08",
      author: "Storyteller",
      content:
        "A mysterious storm engulfed the Misty Peaks, revealing an ancient floating citadel thought to be long lost.",
      tags: ["event", "discovery"],
      pinned: true,
      campaignId: null,
    },
  ];

  const sessionAttendance = {
    1: ["Alice", "Charlie"],
    2: ["Bob", "Diana"],
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WorldOverview
            worldName={worldName}
            worldDescription={worldDescription}
            activeCampaigns={campaigns.filter((c) => c.active).length}
            totalPlayers={players.length}
            totalCharacters={allSheets.length}
          />
          <CampaignsList
            campaigns={campaigns}
            sessionAttendance={sessionAttendance}
          />
          <WorldJournal
            journalEntries={journalEntries}
            campaigns={campaigns}
            currentWorldYear={currentWorldYear}
          />
        </div>
        <div className="space-y-8">
          <PlayersList players={players} />
          <AllSheets sheets={allSheets} />
        </div>
      </div>
    </>
  );
}
