import { createClient } from "@/utils/supabase/server";

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

  const avatar_url = await supabase.storage
    .from("avatars")
    .getPublicUrl(data?.avatar_url ?? "");

  return { ...data, avatar_url: avatar_url.data.publicUrl };
};
