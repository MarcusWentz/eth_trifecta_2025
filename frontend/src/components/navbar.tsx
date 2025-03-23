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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Wallet,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  HelpCircle,
  Gift,
  MegaphoneIcon,
  ArrowRight
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
              <Sparkles className="h-5 w-5 mr-2 text-indigo-400" />
              <span className="font-bold text-xl">
                Sovereign<span className="text-indigo-400">ads</span>
              </span>
              {isDashboard && (
                <Badge 
                  variant="outline" 
                  className="ml-2 font-normal text-xs bg-slate-800/60 border-slate-700 text-slate-300"
                >
                  {isUserDashboard ? "User" : "Advertiser"}
                </Badge>
              )}
            </Link>

            {/* Desktop Nav Links - Only show a simplified version with two main paths */}
            {!isDashboard && (
              <nav className="hidden md:flex md:ml-6 md:gap-1">
                <Link href="/user-dashboard">
                  <Button 
                    variant="ghost" 
                    className="group flex items-center gap-1.5 px-3 text-sm rounded-lg text-slate-200 hover:bg-blue-600/10 hover:text-blue-400"
                  >
                    <Gift className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    For Users
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    variant="ghost" 
                    className="group flex items-center gap-1.5 px-3 text-sm rounded-lg text-slate-200 hover:bg-purple-600/10 hover:text-purple-400"
                  >
                    <MegaphoneIcon className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    For Advertisers
                  </Button>
                </Link>
              </nav>
            )}

            {/* Dashboard Nav */}
            {isDashboard && (
              <div className="hidden md:flex md:ml-6 md:items-center">
                {isUserDashboard ? (
                  <nav className="flex space-x-1">
                    <Link href="/user-dashboard">
                      <Button variant="ghost" size="sm" className={cn(
                        pathname === "/user-dashboard" 
                          ? "bg-slate-800/50 text-indigo-400 border-b-2 border-indigo-400 rounded-none" 
                          : "hover:bg-slate-800/30 rounded-lg"
                      )}>
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/user-dashboard/rewards">
                      <Button variant="ghost" size="sm" className={cn(
                        pathname === "/user-dashboard/rewards" 
                          ? "bg-slate-800/50 text-indigo-400 border-b-2 border-indigo-400 rounded-none" 
                          : "hover:bg-slate-800/30 rounded-lg"
                      )}>
                        Rewards
                      </Button>
                    </Link>
                    <Link href="/user-dashboard/history">
                      <Button variant="ghost" size="sm" className={cn(
                        pathname === "/user-dashboard/history" 
                          ? "bg-slate-800/50 text-indigo-400 border-b-2 border-indigo-400 rounded-none" 
                          : "hover:bg-slate-800/30 rounded-lg"
                      )}>
                        History
                      </Button>
                    </Link>
                  </nav>
                ) : (
                  <nav className="flex space-x-1">
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm" className={cn(
                        pathname === "/dashboard" 
                          ? "bg-slate-800/50 text-indigo-400 border-b-2 border-indigo-400 rounded-none" 
                          : "hover:bg-slate-800/30 rounded-lg"
                      )}>
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/create-ad">
                      <Button variant="ghost" size="sm" className={cn(
                        pathname === "/dashboard/create-ad" 
                          ? "bg-slate-800/50 text-indigo-400 border-b-2 border-indigo-400 rounded-none" 
                          : "hover:bg-slate-800/30 rounded-lg"
                      )}>
                        Create Ad
                      </Button>
                    </Link>
                    <Link href="/dashboard/analytics">
                      <Button variant="ghost" size="sm" className={cn(
                        pathname === "/dashboard/analytics" 
                          ? "bg-slate-800/50 text-indigo-400 border-b-2 border-indigo-400 rounded-none" 
                          : "hover:bg-slate-800/30 rounded-lg"
                      )}>
                        Analytics
                      </Button>
                    </Link>
                  </nav>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* For Homepage: Show simplified dashboard links on larger screens */}
            {!isDashboard && !isConnected && (
              <div className="hidden md:flex md:items-center md:gap-3">
                <Link href="/user-dashboard">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 group"
                  >
                    User Dashboard
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="sm"
                    variant="outline" 
                    className="border-purple-600/30 text-purple-400 hover:bg-purple-600/10"
                  >
                    Advertiser Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Wallet Connection */}
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 pl-2 pr-1 rounded-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700"
                  >
                    <Avatar className="h-6 w-6 bg-gradient-to-br from-indigo-500 to-purple-600">
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
                  
                  {isUserDashboard && (
                    <>
                      <Link href="/user-dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          <Gift className="mr-2 h-4 w-4 text-blue-400" />
                          <span>Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      
                      <Link href="/user-dashboard/rewards">
                        <DropdownMenuItem className="cursor-pointer">
                          <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
                          <span>Rewards</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  
                  {isAdvertiserDashboard && (
                    <>
                      <Link href="/dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          <MegaphoneIcon className="mr-2 h-4 w-4 text-purple-400" />
                          <span>Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      
                      <Link href="/dashboard/create-ad">
                        <DropdownMenuItem className="cursor-pointer">
                          <Gift className="mr-2 h-4 w-4 text-green-400" />
                          <span>Create Ad</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  
                  {/* Show both dashboard options if on homepage */}
                  {!isDashboard && (
                    <>
                      <Link href="/user-dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          <Gift className="mr-2 h-4 w-4 text-blue-400" />
                          <span>User Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      
                      <Link href="/dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          <MegaphoneIcon className="mr-2 h-4 w-4 text-purple-400" />
                          <span>Advertiser Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      
                      <DropdownMenuSeparator className="bg-slate-800" />
                    </>
                  )}
                  
                  <Link href={isDashboard ? `${isUserDashboard ? "/user-dashboard" : "/dashboard"}/settings` : "/settings"}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  
                  <Link href="/help">
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                  </Link>
                  
                  <DropdownMenuSeparator className="bg-slate-800" />
                  
                  <DropdownMenuItem 
                    onClick={() => disconnect()}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <ConnectButton label="Connect" />
            )}
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Simplified */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md">
          <div className="py-3 px-4">
            {!isDashboard ? (
              <>
                <div className="grid grid-cols-1 gap-1 mb-3">
                  <Link 
                    href="/user-dashboard" 
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-600/30 text-blue-200"
                  >
                    <Gift className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="font-medium">User Dashboard</div>
                      <div className="text-xs text-blue-300/80">View rewards & ad history</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-blue-400" />
                  </Link>
                  
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-600/30 text-purple-200"
                  >
                    <MegaphoneIcon className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="font-medium">Advertiser Dashboard</div>
                      <div className="text-xs text-purple-300/80">Create & manage campaigns</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-purple-400" />
                  </Link>
                </div>
              </>
            ) : isUserDashboard ? (
              <div className="grid grid-cols-2 gap-1">
                <Link href="/user-dashboard" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/user-dashboard" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <Gift className="h-5 w-5 mb-1" />
                  <span className="text-sm">Dashboard</span>
                </Link>
                <Link href="/user-dashboard/rewards" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/user-dashboard/rewards" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <Sparkles className="h-5 w-5 mb-1" />
                  <span className="text-sm">Rewards</span>
                </Link>
                <Link href="/user-dashboard/history" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/user-dashboard/history" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <HelpCircle className="h-5 w-5 mb-1" />
                  <span className="text-sm">Ad History</span>
                </Link>
                <Link href="/user-dashboard/wallets" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/user-dashboard/wallets" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <Wallet className="h-5 w-5 mb-1" />
                  <span className="text-sm">Wallets</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1">
                <Link href="/dashboard" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/dashboard" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <MegaphoneIcon className="h-5 w-5 mb-1" />
                  <span className="text-sm">Dashboard</span>
                </Link>
                <Link href="/dashboard/create-ad" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/dashboard/create-ad" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <Gift className="h-5 w-5 mb-1" />
                  <span className="text-sm">Create Ad</span>
                </Link>
                <Link href="/dashboard/manage-ads" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/dashboard/manage-ads" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <Settings className="h-5 w-5 mb-1" />
                  <span className="text-sm">Manage Ads</span>
                </Link>
                <Link href="/dashboard/analytics" className={cn(
                  "flex flex-col items-center p-2 rounded-md text-center",
                  pathname === "/dashboard/analytics" ? "bg-slate-800/60 text-white" : "text-slate-300"
                )}>
                  <HelpCircle className="h-5 w-5 mb-1" />
                  <span className="text-sm">Analytics</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 