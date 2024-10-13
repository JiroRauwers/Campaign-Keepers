import { AllSheets } from "@/components/world/AllSheets";
import { CampaignsList } from "@/components/world/CampaignsList";
import { PlayersList } from "@/components/world/PlayersList";
import { WorldJournal } from "@/components/world/WorldJournal";
import { WorldOverview } from "@/components/world/WorldOverview";
import { createClient } from "@/utils/supabase/server";
import Head from "next/head";
import {
  filter,
  flat,
  flatMap,
  mapToObj,
  pipe,
  unique,
  uniqueBy,
} from "remeda";
import { Tables } from "@/database.types";
import { FloatingSessionViewer } from "@/components/FloatingSessionViewer";
import { assert } from "console";

export async function generateMetadata({
  params,
}: {
  params: { world_id: string };
}) {
  const supabase = createClient();
  const { data: world, error } = await supabase
    .from("worlds")
    .select("name")
    .single();
  return { title: world?.name };
}

export default async function WorldPage({
  params,
}: {
  params: { world_id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: world, error: worldError } = await supabase
    .from("worlds")
    .select("*, campaigns(*), user_world(*, profiles(*)), sheets(*)")
    .single();

  if (worldError) {
    return <div>Error: {worldError.message}</div>;
  }
  assert(world, "World not found");

  const profiles = pipe(
    world.user_world,
    flatMap((uw) => uw.profiles as Tables<"profiles">[]),
    uniqueBy((p) => p.id)
    // filter((p) => p.id !== user!.id)
  );

  const attendance = pipe(
    world.campaigns,
    mapToObj((c) => [c.campaign_id, getRandomAttendees()])
  );

  return (
    <>
      <FloatingSessionViewer data={{ res: profiles, wp: world.user_world }} />
      <Head>
        <title>{world?.name}</title>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WorldOverview
            worldName={world?.name}
            worldDescription={world?.description ?? ""}
            activeCampaigns={
              world.campaigns.filter((c) => c.campaign_date !== null).length
            }
            totalPlayers={profiles.length}
            totalCharacters={world.sheets.length}
          />
          <CampaignsList
            campaigns={world?.campaigns ?? []}
            sessionAttendance={attendance}
            {...{ worldId: world.world_id }}
          />
          <WorldJournal
            journalEntries={[]}
            campaigns={[]}
            currentWorldYear={0}
          />
        </div>
        <div className="space-y-8">
          <PlayersList players={profiles} />
          <AllSheets sheets={world.sheets} />
        </div>
      </div>
    </>
  );
}

function getRandomAttendees(): string[] {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Isabel",
    "Jack",
  ];
  const count = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
  return names.sort(() => 0.5 - Math.random()).slice(0, count);
}
