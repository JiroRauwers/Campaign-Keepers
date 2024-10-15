"use client";

import { Tables } from "@/database.types";
import { Castle } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "../theme-switcher";
import { HeaderAuth } from "./header-auth";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function Navbar({ user }: { user: Tables<"profiles"> | null }) {
  const pathname = usePathname();

  const breadcrumbs = useMemo(
    () => pathname.split("/").filter((path) => path !== ""),
    [pathname]
  );

  return (
    <nav className="w-full z-30 sticky top-0 backdrop-blur-sm bg-background/50 flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex max-w-7xl justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"} className="flex items-center gap-2">
            <Castle className="w-6 h-6" /> Campaign Keepers
          </Link>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={breadcrumb}>
                  <BreadcrumbLink href={`/${breadcrumb}`}>
                    {breadcrumb}
                  </BreadcrumbLink>
                  {index !== breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator key={`separator-${index}`} />
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex w-fit flex-1 justify-end">
          <HeaderAuth user={user} />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
