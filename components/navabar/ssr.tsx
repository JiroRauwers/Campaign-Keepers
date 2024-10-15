import { getUserProfile } from "@/lib/getUserProfile";
import { Navbar } from "./nav";

export async function NavbarSSR() {
  const user = await getUserProfile();

  return <Navbar user={user} />;
}
