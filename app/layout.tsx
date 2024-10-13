import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Castle } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Campaign Keeper",
  description: "Keep track of your campaigns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground ">
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <nav className="w-full z-30 sticky top-0 backdrop-blur-sm bg-background/50 flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full flex max-w-7xl justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"} className="flex items-center gap-2">
                    <Castle className="w-6 h-6" /> Campaign Keepers
                  </Link>
                  {/* <div className="flex items-center gap-2">
                      <DeployButton />
                    </div> */}
                </div>
                <div className="flex items-center gap-2">
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  <ThemeSwitcher />
                </div>
              </div>
            </nav>
            <div className="flex-1 flex flex-col max-w-7xl gap-20  p-5">
              {children}
            </div>

            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
              <p>Powered by </p>
              <Link href="https://www.campaignkeeper.com">
                Campaign Keepers
              </Link>
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
