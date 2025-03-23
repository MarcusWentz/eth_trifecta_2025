"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  Award, 
  BadgeCheck, 
  CreditCard, 
  Gift, 
  Home, 
  HistoryIcon, 
  Settings, 
  Sparkles, 
  Star, 
  WalletCards,
  Eye,
  Bell,
  BookOpen,
  Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UserSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavigationItem {
  name: string
  href: string
  icon: React.ElementType
  current: boolean
  badge?: string
}

interface Navigation {
  main: NavigationItem[]
  preferences: NavigationItem[]
  profile: NavigationItem[]
}

export function UserSidebar({ className, ...props }: UserSidebarProps) {
  const pathname = usePathname()

  const navigation: Navigation = {
    main: [
      {
        name: "Overview",
        href: "/user-dashboard",
        icon: Home,
        current: pathname === "/user-dashboard"
      },
      {
        name: "Rewards",
        href: "/user-dashboard/rewards",
        icon: Gift,
        current: pathname === "/user-dashboard/rewards",
        badge: "New"
      },
      {
        name: "Ad History",
        href: "/user-dashboard/history",
        icon: HistoryIcon,
        current: pathname === "/user-dashboard/history"
      },
      {
        name: "Wallets",
        href: "/user-dashboard/wallets",
        icon: WalletCards,
        current: pathname === "/user-dashboard/wallets"
      },
    ],
    preferences: [
      {
        name: "Interests",
        href: "/user-dashboard/interests",
        icon: Star,
        current: pathname === "/user-dashboard/interests"
      },
    ],
    profile: [
      {
        name: "Settings",
        href: "/user-dashboard/settings",
        icon: Settings,
        current: pathname === "/user-dashboard/settings"
      },
    ]
  }

  return (
    <div className={cn("flex h-full w-full flex-col px-3 py-4", className)} {...props}>
      <div className="mb-8 flex items-center px-2">
        <Sparkles className="mr-2 h-6 w-6 text-indigo-500" />
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Sovereign Ads
          </span>
          <Badge variant="outline" className="ml-2 text-xs font-normal">User</Badge>
        </Link>
      </div>
      
      <div className="space-y-6 flex-1">
        <div>
          <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main
          </h3>
          <nav className="mt-2 flex flex-col space-y-1">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  item.current
                    ? "bg-indigo-900/20 text-indigo-400 border-l-2 border-indigo-600"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    item.current
                      ? "text-indigo-400"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="flex-grow">{item.name}</span>
                {item.badge && (
                  <Badge 
                    variant={item.badge === "Pro" ? "secondary" : "default"}
                    className={cn(
                      "ml-auto",
                      item.badge === "Pro" ? "bg-gradient-to-r from-amber-500 to-orange-600" : ""
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div>
          <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Preferences
          </h3>
          <nav className="mt-2 flex flex-col space-y-1">
            {navigation.preferences.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  item.current
                    ? "bg-indigo-900/20 text-indigo-400 border-l-2 border-indigo-600"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    item.current
                      ? "text-indigo-400"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="flex-grow">{item.name}</span>
                {item.badge && (
                  <Badge 
                    variant={item.badge === "Pro" ? "secondary" : "default"}
                    className={cn(
                      "ml-auto",
                      item.badge === "Pro" ? "bg-gradient-to-r from-amber-500 to-orange-600" : ""
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div>
          <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Your Account
          </h3>
          <nav className="mt-2 flex flex-col space-y-1">
            {navigation.profile.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  item.current
                    ? "bg-indigo-900/20 text-indigo-400 border-l-2 border-indigo-600"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    item.current
                      ? "text-indigo-400"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="rounded-lg border border-indigo-800/30 bg-indigo-900/10 p-4">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-indigo-400 mr-3" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Gold User</h3>
              <p className="text-xs text-muted-foreground mt-1">Earn 2x rewards</p>
            </div>
          </div>
          <div className="mt-3">
            <Link 
              href="/user-dashboard/upgrade"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center"
            >
              <Zap className="h-3 w-3 mr-1" />
              Upgrade to Platinum
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 