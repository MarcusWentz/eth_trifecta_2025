"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Eye, 
  Wallet, 
  Settings, 
  ArrowUpRight, 
  ArrowRight, 
  Bell,
  Clock,
  Flame,
  Calendar,
  BarChart2,
  ExternalLink,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function UserDashboardPage() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Daily reward data
  const rewardData = [
    { name: 'Mon', amount: 2.5 },
    { name: 'Tue', amount: 3.2 },
    { name: 'Wed', amount: 1.8 },
    { name: 'Thu', amount: 4.0 },
    { name: 'Fri', amount: 3.5 },
    { name: 'Sat', amount: 5.2 },
    { name: 'Sun', amount: 2.9 },
  ]

  // Ad category data
  const categoryData = [
    { name: 'DeFi', value: 35 },
    { name: 'NFTs', value: 25 },
    { name: 'Gaming', value: 20 },
    { name: 'Layer 2', value: 15 },
    { name: 'Social', value: 5 },
  ]

  // Monthly trend data
  const trendData = [
    { month: 'Jan', rewards: 35, views: 25 },
    { month: 'Feb', rewards: 45, views: 35 },
    { month: 'Mar', rewards: 60, views: 45 },
    { month: 'Apr', rewards: 75, views: 58 },
    { month: 'May', rewards: 85, views: 66 },
    { month: 'Jun', rewards: 105, views: 80 },
  ]

  // Recent ad views
  const recentViews = [
    {
      id: 1,
      advertiser: "MetaMask",
      title: "Secure Your Crypto Assets",
      time: "2 hours ago",
      reward: 0.45,
    },
    {
      id: 2,
      advertiser: "Uniswap",
      title: "Trade Tokens with Low Fees",
      time: "4 hours ago",
      reward: 0.65,
    },
    {
      id: 3,
      advertiser: "Lens Protocol",
      title: "Join the Social Revolution",
      time: "Yesterday",
      reward: 0.35,
    },
  ]

  // COLORS for pie chart
  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899']

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              You need to connect your wallet to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <ConnectButton />
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8">
        <div>
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {address ? address.slice(0, 6) + '...' + address.slice(-4) : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-700 bg-slate-800/50">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Eye className="h-4 w-4 mr-2" />
            Watch Ads
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-900/50 border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Total Earned</p>
                <h3 className="text-2xl font-bold mt-1">42.75 ZKT</h3>
                <div className="flex items-center mt-1 text-emerald-500 text-xs">
                  <ArrowUp className="h-3 w-3 mr-1" /> 
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Views This Week</p>
                <h3 className="text-2xl font-bold mt-1">28</h3>
                <div className="flex items-center mt-1 text-emerald-500 text-xs">
                  <ArrowUp className="h-3 w-3 mr-1" /> 
                  <span>+8% from last week</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Eye className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Current Balance</p>
                <h3 className="text-2xl font-bold mt-1">18.5 ZKT</h3>
                <div className="flex items-center mt-1 text-amber-500 text-xs">
                  <span>≈ $9.25 USD</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-rose-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Daily Streak</p>
                <h3 className="text-2xl font-bold mt-1">7 Days</h3>
                <div className="flex items-center mt-1 text-rose-500 text-xs">
                  <Flame className="h-3 w-3 mr-1" /> 
                  <span>+2 bonus tomorrow</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                <Flame className="h-5 w-5 text-rose-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Rewards Activity</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    This Week
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                    <BarChart2 className="h-3.5 w-3.5 mr-1" />
                    Monthly
                  </Button>
                </div>
              </div>
              <CardDescription>
                Daily rewards earned from ad views
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={rewardData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#334155',
                      borderRadius: '6px',
                      color: '#f8fafc' 
                    }}
                    formatter={(value) => [`${value} ZKT`, 'Rewards']}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="url(#colorGradient)" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-slate-900/50 border-slate-800 h-full">
            <CardHeader>
              <CardTitle>Ad Categories</CardTitle>
              <CardDescription>
                Distribution of ads you've viewed
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-6">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={4}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        borderColor: '#334155',
                        borderRadius: '6px',
                        color: '#f8fafc' 
                      }}
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full grid grid-cols-2 gap-2 mt-2">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-sm mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs text-slate-300 mr-1">{category.name}</span>
                    <span className="text-xs text-slate-500">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Progress and Recent Views */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle>Rewards Progress</CardTitle>
            <CardDescription>
              Track your progress towards the next reward level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">ZKT Rewards Level</div>
                    <div className="text-xs text-slate-400">Tier 2 - Advanced</div>
                  </div>
                </div>
                <Badge 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none"
                >
                  Level 2
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Progress to Level 3</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2 bg-slate-800" />
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>2,150 / 3,000 XP</span>
                <span>Earning 0.65 ZKT per view</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-400" />
                Upcoming Rewards
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 px-3 rounded-md bg-slate-800/30 border border-slate-800">
                  <div>
                    <div className="text-sm font-medium">Level 3 Unlocks</div>
                    <div className="text-xs text-slate-400">Premium campaign access</div>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    850 XP more
                  </Button>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-md bg-slate-800/30 border border-slate-800">
                  <div>
                    <div className="text-sm font-medium">Reward Multiplier</div>
                    <div className="text-xs text-slate-400">+0.1 ZKT per view</div>
                  </div>
                  <Button size="sm" className="h-7 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Claim Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle>Recent Ad Views</CardTitle>
            <CardDescription>
              Your latest ad interactions and rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {recentViews.map((view) => (
                <div key={view.id} className="flex items-start p-3 rounded-lg bg-slate-800/20 border border-slate-800 hover:bg-slate-800/40 transition-colors">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarFallback className="bg-indigo-900/50 text-indigo-400">
                      {view.advertiser.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium truncate">{view.title}</h4>
                        <p className="text-xs text-slate-400">{view.advertiser}</p>
                      </div>
                      <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                        +{view.reward} ZKT
                      </Badge>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-slate-500 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" />
                        Verified
                      </span>
                      <span className="text-xs text-slate-500">{view.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/user-dashboard/history" className="block">
              <Button variant="outline" className="w-full border-slate-700 bg-slate-800/30 hover:bg-slate-800/60">
                View All History
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card className="bg-slate-900/50 border-slate-800 mb-8">
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
          <CardDescription>
            Your rewards and views over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155',
                  borderRadius: '6px',
                  color: '#f8fafc' 
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="rewards" 
                stroke="#6366f1" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#10b981" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/user-dashboard/rewards">
          <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-colors h-full">
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium">Rewards</h3>
                <p className="text-xs text-slate-400">Redeem your earned ZKT</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user-dashboard/history">
          <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-colors h-full">
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Eye className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-medium">Ad History</h3>
                <p className="text-xs text-slate-400">View your ad interaction history</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user-dashboard/wallets">
          <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-colors h-full">
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium">Wallet</h3>
                <p className="text-xs text-slate-400">Manage your wallet and tokens</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user-dashboard/interests">
          <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-colors h-full">
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 h-10 w-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                <Settings className="h-5 w-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-medium">Preferences</h3>
                <p className="text-xs text-slate-400">Set your ad preferences</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
} 