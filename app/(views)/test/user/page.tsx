"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CreateWindow, WindowMode } from "../../windowContext";

export default function Page() {
  const pathname = usePathname();

  return (
    <>
      <h1 className="text-3xl sticky top-0">User</h1>
      <div className="flex flex-col gap-4">
        <Button asChild>
          <Link href="/test/home">Go to /test/home</Link>
        </Button>
        <Button asChild>
          <Link href="/test/world">Go to /test/world</Link>
        </Button>

        <CreateWindow title="sample user window" type={WindowMode.Floating} />

        <div>current path: {pathname}</div>
      </div>
    </>
  );
}
