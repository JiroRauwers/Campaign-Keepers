import Link from "next/link";
import { NavbarSSR } from "./navabar/ssr";
import { ThemeSwitcher } from "./theme-switcher";
import { cn } from "@/lib/utils";

export function PageBase({
  children,
  disableFooter = false,
  disablePadding = false,
  className,
}: {
  children: React.ReactNode;
  disableFooter?: boolean;
  disablePadding?: boolean;
  className?: string;
}) {
  return (
    <main className="flex-1 justify-between w-full items-center flex flex-col">
      <section
        className={cn(
          "flex-1 flex flex-col gap-2 w-full",
          !disablePadding && "p-5 container",
          className
        )}
      >
        {children}
      </section>
    </main>
  );
}
