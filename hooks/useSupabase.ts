import { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/client";

import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

export function useSupabase<result, result2 extends result | null>(
  fn: (
    supabase: SupabaseClient<Database>
  ) => Promise<PostgrestSingleResponse<result>>,
  settings: {
    sub?: {
      name: string;
      table: keyof Database["public"]["Tables"];
    };
    initialData?: result2;
  } = {}
): [PostgrestSingleResponse<result>, () => void] {
  const supabase = createClient();

  const [res, setRes] = useState<PostgrestSingleResponse<result>>({
    // @ts-expect-error some missunderstaning in typescript type assertions
    data: settings.initialData ?? null,
    count: null,
    status: 0,
    statusText: "",
    error: null,
  });
  const _reexecute = useRef(0);
  const reexecute = () => _reexecute.current++;

  useEffect(() => {
    async function query() {
      const res1 = supabase
        .from("p_configs")
        .update({ data: { name: "New Name" }, id: "1" });
      const res = await fn(supabase);
      setRes(res);
    }
    query();
  }, [_reexecute]);

  if (settings.sub) {
    supabase.channel(settings.sub.name).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: settings.sub.table,
      },
      (payload) => {
        // TODO: handle payload
        reexecute();
      }
    );
  }

  return [res, reexecute];
}
