"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Package, Settings, LogOut, Boxes, Menu } from "lucide-react";
import { useAuthStore } from "@/store/useAuthstore";
import { useEffect, useState } from "react";
import { useAuthInit } from "@/hooks/useAuthInit";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   useAuthInit();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, hydrated } = useAuthStore();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!user || user.role !== "admin") {
      router.replace("/");
    }
  }, [hydrated, user, router]);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/admin" },
    { name: "Users", icon: <Users size={18} />, href: "/admin/users" },
    { name: "Orders", icon: <Package size={18} />, href: "/admin/orders" },
    { name: "Products", icon: <Boxes size={18} />, href: "/admin/products" },
    { name: "Settings", icon: <Settings size={18} />, href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-white dark:bg-gray-800 border-b z-50">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 
        transition-transform duration-300 z-40
        ${mobileOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <div className="p-4 border-b dark:border-gray-700 hidden md:block">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Admin Panel</h2>
        </div>

        <nav className="flex flex-col p-4 space-y-2 pt-16 md:pt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t dark:border-gray-700">
          <button
            onClick={() => {
              logout();
              document.cookie = "token=; path=/; max-age=0;";
              router.push("/auth/login");
            }}
            className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:ml-64 pt-16 md:pt-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
