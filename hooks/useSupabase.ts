import { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/client";

import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

export function useSupabase<result>(
  fn: (
    supabase: SupabaseClient<Database>
  ) => Promise<PostgrestSingleResponse<result>>,
  subName?: string
): [PostgrestSingleResponse<result>, () => void] {
  const supabase = createClient();

  const [res, setRes] = useState<PostgrestSingleResponse<result>>({
    // @ts-expect-error some missunderstaning in typescript type assertions
    data: null,
    count: null,
    status: 0,
    statusText: "",
    error: null,
  });
  const _reexecute = useRef(0);
  const reexecute = () => _reexecute.current++;

  useEffect(() => {
    async function query() {
      const res = await fn(supabase);
      setRes(res);
    }
    query();
  }, [_reexecute]);

  if (subName) {
    supabase.channel(subName).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "p_sheets",
      },
      (payload) => {
        console.log(payload);
      }
    );
  }

  return [res, reexecute];
}
