import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NavbarSSR } from "@/components/navabar/ssr";

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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <div id="modal-root" />
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <NavbarSSR /> */}
          {children}
          {modal}
          <footer className="w-full backdrop-blur-sm flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
            <p>Powered by </p>
            <Link href="https://www.campaignkeeper.com">Campaign Keepers</Link>
            <ThemeSwitcher />
          </footer>
          {/* <StarField /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
