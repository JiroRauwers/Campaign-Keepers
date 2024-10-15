"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import UserAvatar from "./avatar";
import { toast } from "sonner";
import { Tables } from "@/database.types";

export default function AccountForm({ user }: { user: Tables<"profiles"> }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(user.full_name);
  const [username, setUsername] = useState<string | null>(user.username);
  const [website, setWebsite] = useState<string | null>(user.website);
  const [avatar_url, setAvatarUrl] = useState<string | null>(user.avatar_url);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id!)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      toast.error("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <UserAvatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />

      <div>
        <Label htmlFor="fullName">Name</Label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-2 items-center py-4 justify-end">
        <form action="/auth/signout" method="post">
          <Button variant="outline" size="sm" type="submit">
            Sign out
          </Button>
        </form>
        <Button
          className="button primary block"
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>
    </div>
  );
}
