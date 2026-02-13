"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const linkStyle = (href: string) =>
    `px-4 py-2 rounded-lg transition ${
      path === href
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-blue-600 text-xl">
          CareConnect
        </Link>

        <div className="flex gap-3">
          <Link href="/support" className={linkStyle("/support")}>
            Support
          </Link>
          <Link href="/volunteer" className={linkStyle("/volunteer")}>
            Volunteer
          </Link>
          <Link href="/admin" className={linkStyle("/admin")}>
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
