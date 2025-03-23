"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ResponsiveContainer, 
  LineChart, 
  AreaChart, 
  BarChart, 
  PieChart
} from 'recharts'
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import recharts components
const DynamicCartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false })
const DynamicXAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false })
const DynamicYAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false })
const DynamicTooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false })
const DynamicLine = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false })
const DynamicBar = dynamic(() => import('recharts').then((mod) => mod.Bar), { ssr: false })
const DynamicArea = dynamic(() => import('recharts').then((mod) => mod.Area), { ssr: false })
const DynamicPie = dynamic(() => import('recharts').then((mod) => mod.Pie), { ssr: false })
const DynamicCell = dynamic(() => import('recharts').then((mod) => mod.Cell), { ssr: false })

// Sample data for demonstration
const dailyData = [
  { date: '2023-06-01', impressions: 1200, clicks: 45, conversions: 5, spend: 65, ctr: 3.75 },
  { date: '2023-06-02', impressions: 1350, clicks: 52, conversions: 6, spend: 72, ctr: 3.85 },
  { date: '2023-06-03', impressions: 1100, clicks: 38, conversions: 4, spend: 58, ctr: 3.45 },
  { date: '2023-06-04', impressions: 1400, clicks: 60, conversions: 8, spend: 80, ctr: 4.29 },
  { date: '2023-06-05', impressions: 1250, clicks: 48, conversions: 7, spend: 68, ctr: 3.84 },
  { date: '2023-06-06', impressions: 1500, clicks: 65, conversions: 9, spend: 85, ctr: 4.33 },
  { date: '2023-06-07', impressions: 1650, clicks: 72, conversions: 11, spend: 92, ctr: 4.36 }
];

const demographicData = [
  { name: '18-24', value: 25 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 20 },
  { name: '45-54', value: 15 },
  { name: '55+', value: 5 }
];

const geographicData = [
  { name: 'North America', value: 40 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 20 },
  { name: 'Other', value: 10 }
];

const deviceData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 40 },
  { name: 'Tablet', value: 15 }
];

const campaignPerformance = [
  { name: 'Campaign A', impressions: 4000, clicks: 240, conversions: 24, cpc: 0.32, cpa: 8.5, roi: 350 },
  { name: 'Campaign B', impressions: 3000, clicks: 198, conversions: 18, cpc: 0.35, cpa: 9.8, roi: 280 },
  { name: 'Campaign C', impressions: 2000, clicks: 120, conversions: 14, cpc: 0.40, cpa: 7.1, roi: 420 },
  { name: 'Campaign D', impressions: 2780, clicks: 168, conversions: 15, cpc: 0.36, cpa: 10.2, roi: 310 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

export default function AnalyticsPage() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  })

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
          <h2 className="text-2xl font-bold">Loading analytics...</h2>
          <p className="text-muted-foreground">Please connect your wallet to access</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-slate-800/50 border-slate-700 gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange as any}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="campaign-a">Campaign A</SelectItem>
              <SelectItem value="campaign-b">Campaign B</SelectItem>
              <SelectItem value="campaign-c">Campaign C</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Export Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full md:w-auto grid-cols-4 bg-slate-900/50 border-slate-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Campaign performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {typeof window !== 'undefined' && (
                      <>
                        <DynamicCartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <DynamicXAxis dataKey="date" />
                        <DynamicYAxis />
                        <DynamicTooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            borderColor: '#334155',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <DynamicLine type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} name="Impressions" />
                        <DynamicLine type="monotone" dataKey="clicks" stroke="#82ca9d" name="Clicks" />
                        <DynamicLine type="monotone" dataKey="conversions" stroke="#ffc658" name="Conversions" />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>CTR Analysis</CardTitle>
                <CardDescription>
                  Click-through rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dailyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      {typeof window !== 'undefined' && (
                        <>
                          <DynamicCartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <DynamicXAxis dataKey="date" />
                          <DynamicYAxis />
                          <DynamicTooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: '#334155',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                            formatter={(value: any) => [`${value.toFixed(2)}%`, 'CTR']}
                          />
                          <DynamicArea type="monotone" dataKey="ctr" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                        </>
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Ad Spend</CardTitle>
                <CardDescription>
                  Daily spending analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dailyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      {typeof window !== 'undefined' && (
                        <>
                          <DynamicCartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <DynamicXAxis dataKey="date" />
                          <DynamicYAxis />
                          <DynamicTooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: '#334155',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                            formatter={(value: any) => [`$${value}`, 'Spend']}
                          />
                          <DynamicBar dataKey="spend" fill="#82ca9d" name="Spend" />
                        </>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Demographic Distribution</CardTitle>
                <CardDescription>
                  Age groups of your audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      {typeof window !== 'undefined' && (
                        <>
                          <DynamicPie
                            data={demographicData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {demographicData.map((entry, index) => (
                              <DynamicCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </DynamicPie>
                          <DynamicTooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: '#334155',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                          />
                        </>
                      )}
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>
                  Types of devices used by your audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      {typeof window !== 'undefined' && (
                        <>
                          <DynamicPie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {deviceData.map((entry, index) => (
                              <DynamicCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </DynamicPie>
                          <DynamicTooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: '#334155',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                          />
                        </>
                      )}
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-slate-800 md:col-span-2">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Regions where your ads are being viewed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={geographicData}
                      layout="vertical"
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      {typeof window !== 'undefined' && (
                        <>
                          <DynamicCartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <DynamicXAxis type="number" />
                          <DynamicYAxis dataKey="name" type="category" />
                          <DynamicTooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: '#334155',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                            formatter={(value: any) => [`${value}%`, 'Percentage']}
                          />
                          <DynamicBar dataKey="value" fill="#8884d8" name="Percentage" />
                        </>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="mt-4 space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>
                Comparing performance across campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignPerformance}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {typeof window !== 'undefined' && (
                        <>
                          <DynamicCartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <DynamicXAxis dataKey="name" />
                          <DynamicYAxis />
                          <DynamicTooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: '#334155',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                          />
                          <DynamicBar dataKey="impressions" fill="#8884d8" name="Impressions" />
                          <DynamicBar dataKey="clicks" fill="#82ca9d" name="Clicks" />
                          <DynamicBar dataKey="conversions" fill="#ffc658" name="Conversions" />
                        </>
                      )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Cost Metrics</CardTitle>
              <CardDescription>
                CPC, CPA, and ROI comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignPerformance}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {typeof window !== 'undefined' && (
                        <>
                          <DynamicCartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <DynamicXAxis dataKey="name" />
                          <DynamicYAxis />
                          <DynamicTooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: '#334155',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                            formatter={(value: any, name: string) => {
                              if (name === 'cpc' || name === 'cpa') return [`$${value}`, name.toUpperCase()]
                              return [`${value}%`, 'ROI']
                            }}
                          />
                          <DynamicBar dataKey="cpc" fill="#8884d8" name="CPC" />
                          <DynamicBar dataKey="cpa" fill="#82ca9d" name="CPA" />
                          <DynamicBar dataKey="roi" fill="#ffc658" name="ROI" />
                        </>
                      )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversions" className="mt-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>
                Tracking the customer journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Impressions</div>
                    <div className="text-xl font-bold">15,200</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-blue-900/30 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Clicks</div>
                    <div className="text-xl font-bold">673</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-green-900/30 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Sign-ups</div>
                    <div className="text-xl font-bold">112</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-purple-900/30 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Purchases</div>
                    <div className="text-xl font-bold">42</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-amber-900/30 rounded-full">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 