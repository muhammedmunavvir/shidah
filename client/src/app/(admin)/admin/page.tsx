"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthstore";
import { BarChart3, Package, Users, IndianRupee, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { name: "Jan", sales: 42000 },
  { name: "Feb", sales: 38000 },
  { name: "Mar", sales: 52000 },
  { name: "Apr", sales: 49000 },
  { name: "May", sales: 61000 },
  { name: "Jun", sales: 58000 },
];

export default function DashboardPage() {

  const router = useRouter();
  const { user ,hydrated} = useAuthStore();
  console.log(user?.role,"user .role in admin page.tsx")
useEffect(() => {
  if (!hydrated) return;

  if (!user) {
    router.replace("/auth/googleauth");
    return;
  }

  if (user.role !== "admin") {
    router.replace("/");
  }
}, [hydrated, user, router]);


  if(!hydrated){
    return (
       <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 dark:text-gray-300">Loading dashboard...</p>
      </div>
    )
  }
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Get a quick summary of your store’s performance and recent activity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
            <IndianRupee className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2.4L</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" /> +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Orders</CardTitle>
            <Package className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,289</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" /> +5% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Customers</CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">812</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" /> +8% new users
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
            <BarChart3 className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹7.9L</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" /> +15% this quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Monthly Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", color: "#fff" }} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                <th className="text-left py-2 px-3">Order ID</th>
                <th className="text-left py-2 px-3">Customer</th>
                <th className="text-left py-2 px-3">Date</th>
                <th className="text-left py-2 px-3">Amount</th>
                <th className="text-left py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "ORD123", name: "Rahul Sharma", date: "Oct 28, 2025", amount: "₹2,199", status: "Delivered" },
                { id: "ORD124", name: "Aisha Khan", date: "Oct 29, 2025", amount: "₹1,499", status: "Pending" },
                { id: "ORD125", name: "Vikram Patel", date: "Oct 30, 2025", amount: "₹3,250", status: "Shipped" },
              ].map((order) => (
                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60">
                  <td className="py-2 px-3">{order.id}</td>
                  <td className="py-2 px-3">{order.name}</td>
                  <td className="py-2 px-3">{order.date}</td>
                  <td className="py-2 px-3 font-medium text-green-600">{order.amount}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
