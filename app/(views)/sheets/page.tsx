"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/store";
import { useSupabase } from "@/hooks/useSupabase";
import { useWmNavWindow } from "@/hooks/useWm";
import { WindowTypeEnum } from "@/lib/features/wm/types";
import { addWindow } from "@/lib/features/wm/wmSlice";

export default function Page() {
  const navigationWindow = useWmNavWindow({ title: "Sheets list" });
  const dispatch = useAppDispatch();

  const [{ data }, reexecute] = useSupabase(async (s) =>
    s.from("p_sheets").select("*, configs:p_configs(*)")
  );

  return (
    <>
      <h1 className="text-3xl sticky top-0">Sheets</h1>
      <ul className="flex flex-col gap-4">
        {data?.map((sheet) => (
          <li key={sheet.id}>
            <Card
              className="hover:bg-muted cursor-pointer"
              onClick={() => {
                dispatch(
                  addWindow({
                    id: sheet.id,
                    type: WindowTypeEnum.Sheet,
                    data: Object.merge(sheet.data, {
                      _configs: sheet.configs,
                    }),
                  })
                );
              }}
            >
              <CardHeader>
                {typeof sheet.data === "object" && sheet.data !== null
                  ? ((sheet.data as { title?: string })?.title ?? "NO TITLE")
                  : "NO TITLE"}
              </CardHeader>
              <CardContent>
                {typeof sheet.data === "object" && sheet.data !== null
                  ? (sheet.data as { content?: string })?.content
                  : null}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}
