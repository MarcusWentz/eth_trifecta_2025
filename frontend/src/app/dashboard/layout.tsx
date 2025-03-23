"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MenuIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevents hydration errors
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      {/* Desktop Sidebar - visible on lg breakpoint and up */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-xl z-30">
        <DashboardSidebar />
      </div>

      {/* Mobile & Tablet Sidebar - uses Sheet component for slide-out menu */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-slate-900/70 border-slate-700 shadow-md hover:bg-slate-800">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-slate-800 bg-slate-900 w-80">
            <div className="absolute top-4 right-4">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetClose>
            </div>
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="h-full px-4 py-6 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
} 