import { FloatingSessionViewer } from "@/components/FloatingSessionViewer";
import { KnownWorlds } from "@/components/universe/KnownWorlds";
import { RecentActivity } from "@/components/universe/RecentActivity";
import { UniverseInfo } from "@/components/universe/UniverseInfo";
import { UpcomingSessions } from "@/components/universe/UpcomingSessions";
import { createClient } from "@/utils/supabase/server";

export async function UniverseDashboard() {
  const universeInfo = {
    name: "Aethoria",
    description:
      "A vast multiverse of magical realms and technological wonders, where heroes shape the fate of countless worlds.",
    totalWorlds: 5,
    totalCampaigns: 12,
    totalPlayers: 37,
  };

  function getRandomDateThisWeek() {
    const today = new Date();
    // Generate a random number of days to add (0 to 6)
    const daysToAdd = Math.floor(Math.random() * 7);

    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + daysToAdd);

    return randomDate.toISOString();
  }

  const upcomingSessions = [
    {
      id: "1",
      campaignName: "The Crystal Prophecy",
      date: new Date().toISOString(), // Today's date in YYYY-MM-DD format
      players: ["Alice", "Bob", "Charlie"],
    },
    {
      id: "2",
      campaignName: "Shadows of Nebulon",
      date: getRandomDateThisWeek(),
      players: ["David", "Eve", "Frank"],
    },
    {
      id: "3",
      campaignName: "Echoes of Eternity",
      date: getRandomDateThisWeek(),
      players: ["Grace", "Henry", "Ivy"],
    },
  ];

  const recentActivities = [
    {
      id: "1",
      description: "New character 'Zephyr' added to 'The Crystal Prophecy'",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      description: "Campaign 'Shadows of Nebulon' session completed",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      description: "New world 'Celestial Isles' created",
      timestamp: "3 days ago",
    },
    {
      id: "4",
      description: "Player 'Alice' reached level 10 in 'Echoes of Eternity'",
      timestamp: "5 days ago",
    },
  ];

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: knownWorlds, ...res } = await supabase
    .rpc("get_accessible_worlds", {
      id_user: user?.id!,
    })
    .select(`*`);

  return (
    <div>
      <FloatingSessionViewer data={{ res }} />
      <h1 className="text-4xl font-bold text-primary mb-8">
        Universe Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <UpcomingSessions sessions={upcomingSessions} />
          <KnownWorlds worlds={knownWorlds ?? []} />
        </div>
        <div className="space-y-8">
          <UniverseInfo {...universeInfo} />
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}

export default UniverseDashboard;
