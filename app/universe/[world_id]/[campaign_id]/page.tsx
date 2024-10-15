import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { Timeline } from "@/components/campaign/Timeline";
import { CharacterSheets } from "@/components/campaign/CharacterSheets";
import { NPCList } from "@/components/campaign/NPCList";
import { parseISO, isBefore } from "date-fns";
import { createClient } from "@/utils/supabase/server";
import assert from "assert";
import { notFound } from "next/navigation";
import { PlayersList } from "@/components/PlayersList";
import { PageBase } from "@/components/PageBase";

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

export async function CampaignPage({
  params: { campaign_id },
}: {
  params: { campaign_id: string };
}) {
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

  const { events, players, characterSheets, npcs } = sampleData;

  const filteredEvents = events.filter((event) =>
    isBefore(parseISO(event.date), parseISO("2023-10-20"))
  );

  const supabase = createClient();
  const { data: campaign, error } = await supabase
    .from("campaigns")
    .select("*, sheets(*, profiles(*))")
    .eq("campaign_id", campaign_id)
    .single();

  console.log({ campaign, error });

  if (error) notFound();
  assert(campaign, "Campaign not found");

  return (
    <>
      <div className="flex flex-col">
        <CampaignHeader {...{ campaign }} />

        <PageBase>
          <NPCList npcs={npcs} />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="order-2 lg:order-1 lg:w-2/3">
              <Timeline events={filteredEvents} />
            </div>

            <div className="order-1 lg:order-2 lg:w-1/3">
              <div className="lg:sticky top-20 flex flex-col gap-6">
                <PlayersList players={[]} />
                <CharacterSheets sheets={campaign.sheets} />
              </div>
            </div>
          </div>
        </PageBase>
      </div>
    </>
  );
}

export default CampaignPage;
