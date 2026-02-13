import "./globals.css";
import Link from "next/link";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import PageTransition from "@/components/PageTransition";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata = {
  title: "CareConnect",
  description: "AI-powered healthcare intake system for NGOs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">

        <BackgroundBlobs />

        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 transition">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

            <Link
              href="/"
              className="text-xl font-bold text-blue-600 tracking-tight"
            >
              CareConnect
            </Link>

            <nav className="flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">

              <Link href="/support" className="relative group">
                Support
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link href="/volunteer" className="relative group">
                Volunteer
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link href="/admin" className="relative group">
                Admin
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-800 dark:bg-gray-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <DarkModeToggle />
            </nav>
          </div>
        </header>

        <PageTransition>
          {children}
        </PageTransition>

      </body>
    </html>
  );
}
