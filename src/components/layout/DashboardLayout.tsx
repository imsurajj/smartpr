"use client";

import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    title: "Reviews",
    href: "/dashboard/reviews",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen">
      <DashboardNavbar 
        sidebarOpen={sidebarOpen} 
        onSidebarToggle={setSidebarOpen}
        isMobile={isMobile}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-background transition-all duration-300 ease-in-out lg:w-64 lg:border-r",
            isMobile ? (sidebarOpen ? "w-64 border-r" : "w-0") : "w-64 border-r"
          )}
        >
          <div className={cn(
            "h-full overflow-hidden transition-all duration-300",
            isMobile ? (sidebarOpen ? "opacity-100 w-64" : "opacity-0 w-0") : "opacity-100 w-64"
          )}>
            <div className="flex h-full flex-col gap-2 p-4">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="truncate">{item.title}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:pl-64 min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>

        {/* Overlay for mobile */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
} 