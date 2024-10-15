import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import assert from "assert";

export const getUserProfile = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id!)
    .single();

  if (error) throw error;
  assert(data, "User not found");

  const avatar_url = await supabase.storage
    .from("avatars")
    .createSignedUrl(data?.avatar_url ?? "", 60);

  return {
    ...data,
    avatar_url: avatar_url.data?.signedUrl,
  } as Tables<"profiles"> | null;
};
