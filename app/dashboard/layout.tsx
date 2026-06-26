import React from "react";
import { SidebarDashboard } from "@/components/dashboard/sidebar";
import AdminGuard from "@/components/guards/AdminGuard";
import { Toaster } from "sonner";
import { motion } from "framer-motion";

const dashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
      <div className="border flex gap-4 flex-row w-full overflow-hidden h-screen px-6 py-12">
        <SidebarDashboard />

        <main className="w-full overflow-y-auto pr-6 no-scrollbar">
          {children}
        </main>
        <Toaster richColors position="top-center" closeButton />
      </div>
    </AdminGuard>
  );
};

export default dashboardPage;
