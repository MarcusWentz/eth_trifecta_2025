"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAccount, useDisconnect } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Wallet,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Bell,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Users,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  const pathname = usePathname()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Close mobile menu when pathname changes
    setMobileMenuOpen(false)
  }, [pathname])

  if (!mounted) return null

  const isUserDashboard = pathname?.startsWith("/user-dashboard")
  const isAdvertiserDashboard = pathname?.startsWith("/dashboard")
  const isDashboard = isUserDashboard || isAdvertiserDashboard
  
  const formatWalletAddress = (address: string | undefined) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300",
      isDashboard 
        ? "bg-slate-950/80 border-b border-slate-800" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className={cn(
                "font-bold text-xl transition-colors",
                isDashboard ? "text-white" : "text-white"
              )}>
                ZK<span className="text-indigo-400">ads</span>
              </span>
              {isDashboard && (
                <Badge 
                  variant="outline" 
                  className="ml-2 font-normal text-xs bg-slate-800/60 border-slate-700 text-slate-300"
                >
                  {isUserDashboard ? "User Portal" : "Advertiser Portal"}
                </Badge>
              )}
            </Link>

            <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              {!isDashboard && (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger 
                        className={cn(
                          "bg-transparent hover:bg-slate-800/50",
                          pathname === "/" ? "text-indigo-400" : "text-white"
                        )}
                      >
                        Platform
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border border-slate-800 p-6 no-underline outline-none focus:shadow-md"
                                href="/features"
                              >
                                <Sparkles className="h-6 w-6 text-indigo-400 mb-2" />
                                <div className="mb-2 mt-2 text-lg font-medium text-white">
                                  ZKads Platform
                                </div>
                                <p className="text-sm leading-tight text-slate-300">
                                  Engaging ads with privacy-first technology using zero-knowledge proofs
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <Link href="/for-users" legacyBehavior passHref>
                              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800/50 hover:text-indigo-400">
                                <div className="text-sm font-medium">For Users</div>
                                <p className="line-clamp-2 text-sm leading-snug text-slate-400">
                                  Earn tokens for viewing ads with complete privacy
                                </p>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                          <li>
                            <Link href="/for-advertisers" legacyBehavior passHref>
                              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800/50 hover:text-indigo-400">
                                <div className="text-sm font-medium">For Advertisers</div>
                                <p className="line-clamp-2 text-sm leading-snug text-slate-400">
                                  Create effective campaigns with verifiable engagement
                                </p>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                          <li>
                            <Link href="/technology" legacyBehavior passHref>
                              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800/50 hover:text-indigo-400">
                                <div className="text-sm font-medium">Technology</div>
                                <p className="line-clamp-2 text-sm leading-snug text-slate-400">
                                  Learn how our zero-knowledge proofs protect user privacy
                                </p>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/pricing" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(
                          "block select-none px-4 py-2 text-sm font-medium rounded-md transition-colors",
                          pathname === "/pricing" 
                            ? "text-indigo-400" 
                            : "text-white hover:bg-slate-800/50 hover:text-indigo-400"
                        )}>
                          Pricing
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(
                          "block select-none px-4 py-2 text-sm font-medium rounded-md transition-colors",
                          pathname === "/docs" 
                            ? "text-indigo-400" 
                            : "text-white hover:bg-slate-800/50 hover:text-indigo-400"
                        )}>
                          Docs
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )}

              {isDashboard && (
                <div className="flex items-center space-x-1">
                  {isUserDashboard ? (
                    <>
                      <Link href="/user-dashboard" passHref>
                        <Button variant="ghost" className={cn(
                          "text-sm h-8 px-3",
                          pathname === "/user-dashboard" ? "bg-slate-800/80 text-indigo-400" : "hover:bg-slate-800/50"
                        )}>
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/user-dashboard/rewards" passHref>
                        <Button variant="ghost" className={cn(
                          "text-sm h-8 px-3",
                          pathname === "/user-dashboard/rewards" ? "bg-slate-800/80 text-indigo-400" : "hover:bg-slate-800/50"
                        )}>
                          Rewards
                        </Button>
                      </Link>
                      <Link href="/user-dashboard/history" passHref>
                        <Button variant="ghost" className={cn(
                          "text-sm h-8 px-3",
                          pathname === "/user-dashboard/history" ? "bg-slate-800/80 text-indigo-400" : "hover:bg-slate-800/50"
                        )}>
                          History
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard" passHref>
                        <Button variant="ghost" className={cn(
                          "text-sm h-8 px-3",
                          pathname === "/dashboard" ? "bg-slate-800/80 text-indigo-400" : "hover:bg-slate-800/50"
                        )}>
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/dashboard/campaigns" passHref>
                        <Button variant="ghost" className={cn(
                          "text-sm h-8 px-3",
                          pathname === "/dashboard/campaigns" ? "bg-slate-800/80 text-indigo-400" : "hover:bg-slate-800/50"
                        )}>
                          Campaigns
                        </Button>
                      </Link>
                      <Link href="/dashboard/analytics" passHref>
                        <Button variant="ghost" className={cn(
                          "text-sm h-8 px-3",
                          pathname === "/dashboard/analytics" ? "bg-slate-800/80 text-indigo-400" : "hover:bg-slate-800/50"
                        )}>
                          Analytics
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                {isDashboard && (
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 mr-2 rounded-full bg-slate-800/50">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indigo-500" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "flex items-center gap-2 pl-2 pr-1 rounded-full border",
                        isDashboard 
                          ? "bg-slate-800/50 hover:bg-slate-800 border-slate-700" 
                          : "bg-slate-900/70 hover:bg-slate-900/90 border-slate-800"
                      )}
                    >
                      <Avatar className="h-7 w-7 bg-gradient-to-br from-indigo-500 to-purple-600">
                        <AvatarFallback className="text-xs">
                          {address ? address.slice(0, 2) : "ZK"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium max-md:hidden">
                        {formatWalletAddress(address)}
                      </span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-950 border-slate-800">
                    <DropdownMenuLabel className="flex flex-col gap-1">
                      <span>Connected Wallet</span>
                      <span className="text-xs font-normal text-slate-400">
                        {formatWalletAddress(address)}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    
                    {isUserDashboard ? (
                      <>
                        <Link href="/user-dashboard/wallets">
                          <DropdownMenuItem className="cursor-pointer">
                            <Wallet className="mr-2 h-4 w-4" />
                            <span>Manage Wallets</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/user-dashboard/rewards">
                          <DropdownMenuItem className="cursor-pointer">
                            <Sparkles className="mr-2 h-4 w-4" />
                            <span>Rewards</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/user-dashboard/interests">
                          <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Ad Preferences</span>
                          </DropdownMenuItem>
                        </Link>
                      </>
                    ) : isAdvertiserDashboard ? (
                      <>
                        <Link href="/dashboard/campaigns">
                          <DropdownMenuItem className="cursor-pointer">
                            <Users className="mr-2 h-4 w-4" />
                            <span>My Campaigns</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/settings">
                          <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Account Settings</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/billing">
                          <DropdownMenuItem className="cursor-pointer">
                            <Wallet className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                          </DropdownMenuItem>
                        </Link>
                      </>
                    ) : null}
                    
                    <DropdownMenuSeparator className="bg-slate-800" />
                    
                    <Link href="/help">
                      <DropdownMenuItem className="cursor-pointer">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help & Support</span>
                      </DropdownMenuItem>
                    </Link>
                    
                    <DropdownMenuItem 
                      onClick={() => disconnect()}
                      className="cursor-pointer text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Disconnect</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {!isDashboard && (
                  <NavigationMenu className="hidden md:block">
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <Link href="/user-dashboard" legacyBehavior passHref>
                          <NavigationMenuLink className="inline-flex h-9 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800/50 hover:text-indigo-400">
                            For Users
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link href="/dashboard" legacyBehavior passHref>
                          <NavigationMenuLink className="inline-flex h-9 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800/50 hover:text-indigo-400">
                            For Advertisers
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                )}
                
                <ConnectButton />
              </>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className={cn(
            "px-4 py-5 border-t space-y-5",
            isDashboard 
              ? "bg-slate-950/95 border-slate-800" 
              : "bg-slate-900/95 border-slate-800/50"
          )}>
            {!isDashboard ? (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-400">Platform</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/for-users" className="block text-sm py-2">
                      For Users
                    </Link>
                    <Link href="/for-advertisers" className="block text-sm py-2">
                      For Advertisers
                    </Link>
                    <Link href="/technology" className="block text-sm py-2">
                      Technology
                    </Link>
                    <Link href="/pricing" className="block text-sm py-2">
                      Pricing
                    </Link>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-400">Resources</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/docs" className="block text-sm py-2">
                      Documentation
                    </Link>
                    <Link href="/help" className="block text-sm py-2">
                      Help & Support
                    </Link>
                    <Link href="/blog" className="block text-sm py-2">
                      Blog
                    </Link>
                    <Link href="/faq" className="block text-sm py-2">
                      FAQ
                    </Link>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Link href="/user-dashboard" className="flex-1">
                    <Button variant="outline" className="w-full border-slate-700 text-sm">
                      User Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full border-slate-700 text-sm">
                      Advertiser Dashboard
                    </Button>
                  </Link>
                </div>
              </>
            ) : isUserDashboard ? (
              <div className="space-y-1">
                <Link href="/user-dashboard" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Dashboard
                </Link>
                <Link href="/user-dashboard/rewards" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Rewards
                </Link>
                <Link href="/user-dashboard/history" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Ad History
                </Link>
                <Link href="/user-dashboard/wallets" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Wallet Management
                </Link>
                <Link href="/user-dashboard/interests" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Ad Preferences
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <Link href="/dashboard" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Dashboard
                </Link>
                <Link href="/dashboard/campaigns" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Campaigns
                </Link>
                <Link href="/dashboard/analytics" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Analytics
                </Link>
                <Link href="/dashboard/create" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Create Ad
                </Link>
                <Link href="/dashboard/settings" className="block py-2 px-3 rounded-md hover:bg-slate-800/50">
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 