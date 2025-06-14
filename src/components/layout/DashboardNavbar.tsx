"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Home } from "lucide-react";

interface DashboardNavbarProps {
  sidebarOpen: boolean;
  onSidebarToggle: (open: boolean) => void;
  isMobile: boolean;
}

export function DashboardNavbar({
  sidebarOpen,
  onSidebarToggle,
  isMobile,
}: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSidebarToggle(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold">SmartPR</span>
          </Link>
        </div>
        <nav className="flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
} 