"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Package, Users, BarChart3, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Admin Panel
          </h1>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            <BarChart3 className="w-5 h-5" /> Orders
          </Link>
          <Link
            href="/dashboard/users"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            <Users className="w-5 h-5" /> Users
          </Link>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 justify-start"
          >
            <LogOut className="w-5 h-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </Button>

            {/* Admin Avatar */}
            <img
              src="/default-avatar.png"
              alt="Admin"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
