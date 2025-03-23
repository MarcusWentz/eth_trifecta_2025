"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  CalendarIcon, 
  SearchIcon, 
  SlidersHorizontal, 
  Eye, 
  Info, 
  Download,
  BarChart2,
  FileText
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function HistoryPage() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState<string>('all-time')
  const [activeTab, setActiveTab] = useState('viewed-ads')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              You need to connect your wallet to view your ad history
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <ConnectButton />
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Sample data for viewed ads
  const viewedAds = [
    {
      id: 1,
      advertiser: "MetaMask",
      title: "Secure Your Crypto Assets",
      date: "2023-05-20T14:30:00",
      earnings: 0.45,
      category: "DeFi",
      duration: 28,
      status: "Verified",
    },
    {
      id: 2,
      advertiser: "Uniswap",
      title: "Trade Tokens with Low Fees",
      date: "2023-05-19T10:15:00",
      earnings: 0.65,
      category: "DEX",
      duration: 42,
      status: "Verified",
    },
    {
      id: 3,
      advertiser: "Lens Protocol",
      title: "Join the Social Revolution",
      date: "2023-05-18T16:45:00",
      earnings: 0.35,
      category: "Social",
      duration: 20,
      status: "Pending",
    },
    {
      id: 4,
      advertiser: "Chainlink",
      title: "Power Your dApps with Oracle Data",
      date: "2023-05-15T09:30:00",
      earnings: 0.55,
      category: "Infrastructure",
      duration: 35,
      status: "Verified",
    },
    {
      id: 5,
      advertiser: "Polygon",
      title: "Scale Your Ethereum Applications",
      date: "2023-05-14T11:20:00",
      earnings: 0.50,
      category: "L2",
      duration: 30,
      status: "Verified",
    },
    {
      id: 6,
      advertiser: "Arbitrum",
      title: "Experience Fast Ethereum Transactions",
      date: "2023-05-10T13:40:00",
      earnings: 0.40,
      category: "L2",
      duration: 25,
      status: "Verified",
    },
    {
      id: 7,
      advertiser: "Aave",
      title: "Earn Interest on Your Crypto",
      date: "2023-05-08T15:10:00",
      earnings: 0.60,
      category: "DeFi",
      duration: 38,
      status: "Verified",
    },
    {
      id: 8,
      advertiser: "Blur",
      title: "NFT Marketplace for Pro Traders",
      date: "2023-05-05T12:25:00",
      earnings: 0.70,
      category: "NFT",
      duration: 45,
      status: "Failed",
    }
  ]

  // Sample data for earnings history
  const earningsHistory = [
    {
      id: 1,
      date: "2023-05-20",
      activity: "Daily Rewards",
      description: "Viewed 5 ads",
      earnings: 2.50,
      status: "Completed"
    },
    {
      id: 2,
      date: "2023-05-19",
      activity: "Referral Bonus",
      description: "User: crypto_max joined",
      earnings: 5.00,
      status: "Completed"
    },
    {
      id: 3,
      date: "2023-05-18",
      activity: "Daily Rewards",
      description: "Viewed 3 ads",
      earnings: 1.50,
      status: "Completed"
    },
    {
      id: 4,
      date: "2023-05-15",
      activity: "Special Campaign",
      description: "DeFi awareness program",
      earnings: 3.25,
      status: "Completed"
    },
    {
      id: 5,
      date: "2023-05-10",
      activity: "Weekly Bonus",
      description: "Active user reward",
      earnings: 4.50,
      status: "Completed"
    }
  ]

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Verified</Badge>
      case 'Pending':
        return <Badge variant="warning" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>
      case 'Failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredAds = viewedAds.filter(ad => 
    ad.advertiser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEarnings = earningsHistory.filter(earning => 
    earning.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    earning.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filterByDate = (items: any[], dateField: string) => {
    if (dateFilter === 'all-time') return items
    
    const now = new Date()
    const cutoffDate = new Date()
    
    switch (dateFilter) {
      case 'today':
        cutoffDate.setHours(0, 0, 0, 0)
        break
      case 'this-week':
        cutoffDate.setDate(now.getDate() - 7)
        break
      case 'this-month':
        cutoffDate.setMonth(now.getMonth() - 1)
        break
      default:
        return items
    }
    
    return items.filter(item => new Date(item[dateField]) >= cutoffDate)
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ad History</h1>
        <p className="text-muted-foreground">Track your viewed ads and earnings</p>
      </div>
      
      <Card className="bg-slate-900/50 border-slate-800 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="flex items-center flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <Input 
                className="pl-10 bg-slate-950/50 border-slate-800 focus:border-indigo-600"
                placeholder="Search by advertiser, title, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-3 bg-slate-950/50 border-slate-800">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter === 'all-time' ? 'All Time' : 
                      dateFilter === 'today' ? 'Today' : 
                      dateFilter === 'this-week' ? 'This Week' : 'This Month'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800">
                  <DropdownMenuItem onClick={() => setDateFilter('all-time')}>All Time</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('today')}>Today</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('this-week')}>This Week</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('this-month')}>This Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-slate-950/50 border-slate-800">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800">
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    By Category
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    By Status
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="icon" variant="outline" className="bg-slate-950/50 border-slate-800">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
              <TabsTrigger 
                value="viewed-ads" 
                className="data-[state=active]:bg-indigo-600"
              >
                <Eye className="mr-2 h-4 w-4" />
                Viewed Ads
              </TabsTrigger>
              <TabsTrigger 
                value="earnings" 
                className="data-[state=active]:bg-indigo-600"
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Earnings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viewed-ads" className="mt-0">
              <div className="rounded-md border border-slate-800 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="hover:bg-slate-800/70 border-slate-700">
                      <TableHead className="font-medium text-slate-400">Advertiser</TableHead>
                      <TableHead className="font-medium text-slate-400">Ad Title</TableHead>
                      <TableHead className="font-medium text-slate-400">Date</TableHead>
                      <TableHead className="font-medium text-slate-400">Category</TableHead>
                      <TableHead className="font-medium text-slate-400">Duration</TableHead>
                      <TableHead className="font-medium text-slate-400">Earnings</TableHead>
                      <TableHead className="font-medium text-slate-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterByDate(filteredAds, 'date').length > 0 ? (
                      filterByDate(filteredAds, 'date').map((ad) => (
                        <TableRow key={ad.id} className="hover:bg-slate-800/30 border-slate-800">
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-indigo-900/50 text-indigo-400">
                                  {ad.advertiser.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              {ad.advertiser}
                            </div>
                          </TableCell>
                          <TableCell>{ad.title}</TableCell>
                          <TableCell>{formatDate(ad.date)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-800/50 border-slate-700">
                              {ad.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{ad.duration}s</TableCell>
                          <TableCell className="font-semibold text-indigo-400">
                            +{ad.earnings} ZKT
                          </TableCell>
                          <TableCell>{getStatusBadge(ad.status)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="earnings" className="mt-0">
              <div className="rounded-md border border-slate-800 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="hover:bg-slate-800/70 border-slate-700">
                      <TableHead className="font-medium text-slate-400">Date</TableHead>
                      <TableHead className="font-medium text-slate-400">Activity</TableHead>
                      <TableHead className="font-medium text-slate-400">Description</TableHead>
                      <TableHead className="font-medium text-slate-400">Earnings</TableHead>
                      <TableHead className="font-medium text-slate-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterByDate(filteredEarnings, 'date').length > 0 ? (
                      filterByDate(filteredEarnings, 'date').map((earning) => (
                        <TableRow key={earning.id} className="hover:bg-slate-800/30 border-slate-800">
                          <TableCell>{new Date(earning.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{earning.activity}</TableCell>
                          <TableCell>{earning.description}</TableCell>
                          <TableCell className="font-semibold text-indigo-400">
                            +{earning.earnings} ZKT
                          </TableCell>
                          <TableCell>
                            <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                              {earning.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-500">
              Showing {filterByDate(activeTab === 'viewed-ads' ? filteredAds : filteredEarnings, 'date').length} results
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-slate-950/50 border-slate-800" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-950/50 border-slate-800" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Questions about your ad history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <Info className="h-5 w-5 mt-0.5 text-slate-400" />
              <div className="space-y-1">
                <p className="text-sm text-slate-300">
                  Ad views are verified using zero-knowledge proofs to ensure privacy while confirming you've actually viewed the ad.
                </p>
                <p className="text-sm text-slate-400">
                  Pending verifications should be completed within 24 hours.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full hover:bg-indigo-900/20 hover:text-indigo-400 border-slate-700">
              View FAQ
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="flex-1 bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Your activity this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Ads Viewed</span>
              <span className="font-medium">28</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Total Duration</span>
              <span className="font-medium">14m 32s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Earnings</span>
              <span className="font-medium text-indigo-400">17.35 ZKT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Avg. Per Ad</span>
              <span className="font-medium text-indigo-400">0.62 ZKT</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Generate Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 