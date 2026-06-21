
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
   <div className="min-h-screen flex flex-col lg:flex-row bg-[#0C0C14] text-white">
  
  {/* Sidebar */}
  <div className="lg:sticky lg:top-0 lg:h-screen">
    <DashboardSidebar />
  </div>

  {/* Main Content */}
  <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 overflow-x-hidden">
    <div className="w-full max-w-6xl mx-auto">
      {children}
    </div>
  </main>

</div>
  );
};

export default DashboardLayout;