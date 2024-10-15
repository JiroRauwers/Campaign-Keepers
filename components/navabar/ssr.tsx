import { getUserProfile } from "@/lib/getUserProfile";
import { Navbar } from "./nav";

export async function NavbarSSR() {
  try {
    const user = await getUserProfile();
    if (!user) {
      throw new Error("User not found");
    }
    return <Navbar user={user} />;
  } catch (error) {
    console.error(error);
    return null;
  }

}
