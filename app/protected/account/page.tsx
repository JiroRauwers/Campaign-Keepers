import { getUserProfile } from "@/lib/getUserProfile";
import AccountForm from "./form";
import { redirect } from "next/navigation";
import assert from "assert";

export const dynamic = "force-dynamic";

export default async function Account() {
  const user = await getUserProfile();
  if (!user) {
    redirect("/sign-in");
  }
  assert(user, "User must be defined here");

  return <AccountForm user={user} />;
}
