"use client";

import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Posts({
  initialNotes,
}: {
  initialNotes: Prettify<Tables<"notes">>[];
}) {
  const [notes, setNotes] = useState<Prettify<Tables<"notes">>[]>(initialNotes);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel("notes-channel");

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
        },
        (payload) => {
          console.log("Change received!", payload);

          switch (payload.eventType) {
            case "UPDATE":
              setNotes((prevNotes) =>
                prevNotes.map((note) =>
                  note.id === payload.new.id!
                    ? (payload.new as Prettify<Tables<"notes">>)
                    : note
                )
              );
              break;
            case "INSERT":
              setNotes((prevNotes) => [
                ...prevNotes,
                payload.new as Prettify<Tables<"notes">>,
              ]);
              break;
            case "DELETE":
              setNotes((prevNotes) =>
                prevNotes.filter((note) => note.id !== payload.old.id)
              );
              break;
            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
