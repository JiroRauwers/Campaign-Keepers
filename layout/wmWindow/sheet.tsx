"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { IWindow } from "@/lib/features/wm/types";

export default function Sheet({ id, data: initialData }: IWindow) {
  const [{ data: sheetData }] = useSupabase(
    async (s) =>
      s
        .from("p_sheets")
        .select("*, configs:p_configs(*, shared:p_shared(*))")
        .eq("id", id),
    { initialData: initialData }
  );

  return (
    <>
      <pre>{JSON.stringify(sheetData, null, 2)}</pre>
    </>
  );
}
