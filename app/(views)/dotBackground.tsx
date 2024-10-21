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
