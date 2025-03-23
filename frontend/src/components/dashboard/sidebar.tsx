"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListFilter, 
  BarChart2, 
  Settings, 
  HelpCircle,
  Users,
  LogOut,
  Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "Core",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Create Ad",
        href: "/dashboard/create-ad",
        icon: PlusCircle,
        badge: "New"
      },
      {
        title: "Manage Ads",
        href: "/dashboard/manage-ads",
        icon: ListFilter,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart2,
        badge: "Pro"
      },
    ]
  },
  {
    title: "Settings",
    items: [
      {
        title: "Audience",
        href: "/dashboard/audience",
        icon: Users,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "Help & Support",
        href: "/dashboard/support",
        icon: HelpCircle,
      },
    ]
  }
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 py-6">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-blue-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Sovereign Ads
          </h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">Privacy-preserving advertising</p>
      </div>
      
      <nav className="space-y-6 px-3 flex-1">
        {navigationItems.map((section, i) => (
          <div key={i} className="space-y-2">
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    pathname === item.href
                      ? "bg-slate-800/80 text-white shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0",
                    pathname === item.href
                      ? "text-blue-400"
                      : "text-slate-400"
                  )} />
                  <span>{item.title}</span>
                  
                  {item.badge && (
                    <Badge variant={item.badge === "Pro" ? "secondary" : "default"} className={cn(
                      "ml-auto",
                      item.badge === "Pro" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
                    )}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="border-t border-slate-800 mt-6 pt-6 px-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 shrink-0 text-slate-400" />
          <span>Sign Out</span>
        </Link>
        
        <div className="mt-6 px-4">
          <div className="rounded-lg bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-4 border border-slate-700">
            <h4 className="font-medium text-white mb-1 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              Pro Features
            </h4>
            <p className="text-xs text-slate-300 mb-3">Upgrade for advanced analytics and targeting</p>
            <button className="w-full text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 