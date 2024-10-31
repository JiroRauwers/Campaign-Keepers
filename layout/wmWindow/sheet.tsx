"use client";

import { IWindow } from "@/lib/features/wm/types";

export default function Sheet({ data }: IWindow) {
  return (
    <>
      <h1>{data.title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
