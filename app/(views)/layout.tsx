import { ThemeSwitcher } from "@/components/theme-switcher";
import DisplayWindows from "./DisplayWindows";
import { WindowManagerDock } from "./floatingDock";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DotBackgroundDemo className="min-h-screen flex flex-col max-h-screen min-w-screen max-w-screen">
      <main
        className="flex flex-col flex-1 overflow-hidden w-full"
        suppressHydrationWarning
      >
        <DisplayWindows mainWindowChild={children} />
      </main>
      <div className="flex-none pb-4 pt-2">
        <WindowManagerDock />
      </div>
      <div className="absolute top-2 right-2">
        <ThemeSwitcher />
      </div>
    </DotBackgroundDemo>
  );
}

import { cn } from "@/lib/utils";

export function DotBackgroundDemo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "dark:bg-black bg-white *:z-10 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center",
        className
      )}
    >
      <div className="absolute pointer-events-none inset-0 z-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
}
