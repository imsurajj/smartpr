"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart, FileText, Settings, GitPullRequest, LucideProps } from "lucide-react";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface ExternalSidebarItem extends SidebarItem {
  external: true;
}

const sidebarItems: Array<{ category: string; items: (SidebarItem | ExternalSidebarItem)[] }> = [
  {
    category: "Main",
    items: [
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
        title: "Submit Review",
        href: "/dashboard/reviews/submit",
        icon: GitPullRequest,
      },
    ]
  },
  {
    category: "Settings",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ]
  },
  {
    category: "Resources",
    items: [
      {
        title: "GitHub",
        href: "https://github.com/imsurajj/smartpr",
        icon: GitPullRequest,
        external: true,
      },
    ]
  }
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

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

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
            <div className="flex h-full flex-col gap-4 p-4">
              {sidebarItems.map((category, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <h3 className="px-2 text-sm font-medium text-gray-500/80 uppercase tracking-wider">
                    {category.category}
                  </h3>
                  {category.items.map((item) => {
                    const isActive = pathname === item.href;
                    const isExternal = 'external' in item && item.external;

                    const linkContent = (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-2",
                          isActive && "bg-primary/10 text-primary"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="truncate">{item.title}</span>
                      </Button>
                    );

                    if (isExternal) {
                      return (
                        <a 
                          key={item.href} 
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          {linkContent}
                        </a>
                      );
                    } else {
                      return (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          onClick={handleLinkClick}
                        >
                          {linkContent}
                        </Link>
                      );
                    }
                  })}
                </div>
              ))}
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