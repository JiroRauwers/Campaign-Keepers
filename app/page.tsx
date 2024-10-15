import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";


export default async function Index() {
  if (!hasEnvVars) {
    console.log("hasEnvVars", hasEnvVars);
    return <ConnectSupabaseSteps />;
  }

  return <div>welcome to the app</div>;
}
