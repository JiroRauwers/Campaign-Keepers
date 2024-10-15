"use server";
import { getUserProfile } from "@/lib/getUserProfile";
import { Navbar } from "./nav";

export async function NavbarSSR() {
  try {
    const user = await getUserProfile();

    return <Navbar user={user} />;
  } catch (error) {
    console.error(error);
    return null;
  }
}
