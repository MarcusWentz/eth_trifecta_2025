"use client"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Pie, Cell } from 'recharts'
import { DollarSign, Users, ShoppingBag, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isBrowser } from "@/lib/utils"

// Sample data for demonstration
const data = [
  { name: "Jan", revenue: 2400, impressions: 3400 },
  { name: "Feb", revenue: 1398, impressions: 2210 },
  { name: "Mar", revenue: 9800, impressions: 5290 },
  { name: "Apr", revenue: 3908, impressions: 4300 },
  { name: "May", revenue: 4800, impressions: 2181 },
  { name: "Jun", revenue: 3800, impressions: 5500 },
]

const pieData = [
  { name: "Desktop", value: 54.4 },
  { name: "Mobile", value: 35.7 },
  { name: "Tablet", value: 9.9 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export default function DashboardPage() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to home if not connected
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/')
    }
  }, [isConnected, mounted, router])

  if (!mounted || !isConnected) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="text-slate-400">Please connect your wallet to access</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Sovereign Ads advertiser portal overview.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover bg-slate-900/50 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-slate-400">Total Revenue</p>
              <div className="rounded-full bg-blue-500/20 p-2">
                <DollarSign className="h-4 w-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">$45,231</h3>
              <div className="flex items-center text-sm font-medium text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+20.1%</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">+$4,320 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover bg-slate-900/50 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-slate-400">Active Campaigns</p>
              <div className="rounded-full bg-purple-500/20 p-2">
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">12</h3>
              <div className="flex items-center text-sm font-medium text-red-500">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>-2</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">3 campaigns ending soon</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover bg-slate-900/50 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-slate-400">Impressions</p>
              <div className="rounded-full bg-emerald-500/20 p-2">
                <Eye className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">1.2M</h3>
              <div className="flex items-center text-sm font-medium text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+12.3%</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">180K new impressions this week</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover bg-slate-900/50 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-slate-400">Conversion Rate</p>
              <div className="rounded-full bg-amber-500/20 p-2">
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">3.2%</h3>
              <div className="flex items-center text-sm font-medium text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+0.3%</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">Above industry average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-900">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-900">Analytics</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-slate-900">Reports</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-900">Notifications</TabsTrigger>
        </TabsList>
          
          <Button variant="outline" className="hidden md:flex bg-slate-900/70 border-slate-700 hover:bg-slate-800">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Create new campaign
          </Button>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Revenue vs. Impressions over the past 6 months</CardDescription>
            </CardHeader>
              <CardContent className="pl-2">
                <div className="h-80 w-full">
                  {isBrowser && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                        data={data}
                    margin={{
                          top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="revenue"
                            fill="rgba(14, 165, 233, 0.8)"
                            radius={[4, 4, 0, 0]}
                          />
                        <Bar
                            dataKey="impressions"
                            fill="rgba(168, 85, 247, 0.8)"
                            radius={[4, 4, 0, 0]}
                          />
                  </BarChart>
                </ResponsiveContainer>
                  )}
              </div>
            </CardContent>
          </Card>
        
            <Card className="col-span-3 bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Distribution by device type</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                  {isBrowser && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                          ))}
                        </Pie>
                        <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                  )}
                </div>
                
                <div className="mt-4 flex justify-center gap-4">
                  {pieData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div 
                        className="w-3 h-3 mr-2 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{entry.name}</span>
                        <span className="text-xs text-slate-400">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
