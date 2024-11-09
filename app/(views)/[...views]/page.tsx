"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWmNavWindow } from "@/hooks/useWm";
import { useAppDispatch } from "@/hooks/store";
import { addWindow, updateWindow } from "@/lib/features/wm/wmSlice";
import { useSupabase } from "@/hooks/useSupabase";
import {
  WindowModeEnum,
  WindowStateModeEnum,
  WindowTypeEnum,
} from "@/lib/features/wm/types";

export default function Page() {
  const pathname = usePathname();
  const navigationWindow = useWmNavWindow({ title: pathname });

  const dispatch = useAppDispatch();

  if (!navigationWindow) return <div>Loading...</div>;

  const [{ data }, reexecute_Sheets] = useSupabase(async (s) =>
    s.from("p_sheets").select("*, configs:p_configs(name)")
  );

  return (
    <>
      <h1 className="text-3xl sticky top-0">
        {navigationWindow?.data.title ?? "Unknown"}
      </h1>
      <div className="flex flex-col gap-4">
        {data?.map((sheet) => (
          <div key={sheet.id} className="flex flex-col gap-4">
            <h2>
              {typeof sheet.data === "object" && sheet.data !== null
                ? (sheet.data as { title?: string })?.title
                : "NO TITLE"}
            </h2>
            <p>
              {typeof sheet.data === "object" && sheet.data !== null
                ? (sheet.data as { content?: string })?.content
                : null}
            </p>
            <Button
              onClick={() => {
                dispatch(
                  addWindow({
                    type: WindowTypeEnum.Sheet,
                    id: sheet.id,
                  })
                );
              }}
            >
              View
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
