import DisplayWindows from "./DisplayWindows";
import { DotBackgroundDemo } from "./dotBackground";
import { WindowManagerDock } from "./floatingDock";
import { WindowProvider } from "./windowContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WindowProvider mainWindowId="test">
      <DotBackgroundDemo className="min-h-screen flex flex-col max-h-screen min-w-screen max-w-screen">
        <main className="flex flex-col flex-1 w-full">
          <DisplayWindows />
        </main>
        <div className="flex-none pb-4">
          {children}
          <WindowManagerDock />
        </div>
      </DotBackgroundDemo>
    </WindowProvider>
  );
}
