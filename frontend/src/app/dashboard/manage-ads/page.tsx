"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreVertical, Edit, BarChart2, Trash2, Play, Pause, Eye } from "lucide-react"

// Sample data for demonstration
const adCampaigns = [
  { 
    id: 1, 
    name: "Summer Sale Promotion", 
    budget: 1200, 
    spent: 450, 
    status: "active", 
    impressions: 12400, 
    clicks: 345, 
    ctr: 2.78,
    createdAt: "2023-06-15", 
    endDate: "2023-07-15" 
  },
  { 
    id: 2, 
    name: "Product Launch", 
    budget: 3000, 
    spent: 1200, 
    status: "active", 
    impressions: 45000, 
    clicks: 1200, 
    ctr: 2.67,
    createdAt: "2023-05-20", 
    endDate: "2023-07-20" 
  },
  { 
    id: 3, 
    name: "Brand Awareness", 
    budget: 2500, 
    spent: 2500, 
    status: "completed", 
    impressions: 89000, 
    clicks: 3400, 
    ctr: 3.82,
    createdAt: "2023-03-10", 
    endDate: "2023-06-10" 
  },
  { 
    id: 4, 
    name: "Holiday Special", 
    budget: 1800, 
    spent: 0, 
    status: "scheduled", 
    impressions: 0, 
    clicks: 0, 
    ctr: 0,
    createdAt: "2023-06-25", 
    endDate: "2023-12-25" 
  },
  { 
    id: 5, 
    name: "App Download Campaign", 
    budget: 1500, 
    spent: 600, 
    status: "paused", 
    impressions: 15000, 
    clicks: 450, 
    ctr: 3.0,
    createdAt: "2023-05-05", 
    endDate: "2023-08-05" 
  },
]

export default function ManageAdsPage() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCampaigns, setFilteredCampaigns] = useState(adCampaigns)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to home if not connected
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/')
    }
  }, [isConnected, mounted, router])

  // Filter campaigns based on search query and active tab
  useEffect(() => {
    let filtered = adCampaigns
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(campaign => 
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(campaign => campaign.status === activeTab)
    }
    
    setFilteredCampaigns(filtered)
  }, [searchQuery, activeTab])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>
      case "paused":
        return <Badge className="bg-yellow-600">Paused</Badge>
      case "completed":
        return <Badge className="bg-blue-600">Completed</Badge>
      case "scheduled":
        return <Badge className="bg-purple-600">Scheduled</Badge>
      default:
        return <Badge className="bg-slate-600">Unknown</Badge>
    }
  }

  if (!mounted || !isConnected) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="text-muted-foreground">Please connect your wallet to access</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Manage Campaigns
        </h1>
        <Button 
          onClick={() => router.push('/dashboard/create-ad')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Create New Campaign
        </Button>
      </div>

      <Card className="bg-slate-900/50 border-slate-800 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-10 bg-slate-800/50 border-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-auto"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-4 w-full bg-slate-800/50 border-slate-700">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="paused">Paused</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader className="px-6">
          <CardTitle>Ad Campaigns</CardTitle>
          <CardDescription>
            Manage and monitor your advertising campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-800/50">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead className="text-right">Spent</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id} className="hover:bg-slate-800/30">
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell className="text-right">${campaign.budget.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${campaign.spent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-slate-700">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-slate-700">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Campaign</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-slate-700">
                              <BarChart2 className="mr-2 h-4 w-4" />
                              <span>Analytics</span>
                            </DropdownMenuItem>
                            
                            {campaign.status === "active" && (
                              <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-slate-700">
                                <Pause className="mr-2 h-4 w-4" />
                                <span>Pause</span>
                              </DropdownMenuItem>
                            )}
                            
                            {campaign.status === "paused" && (
                              <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-slate-700">
                                <Play className="mr-2 h-4 w-4" />
                                <span>Resume</span>
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem className="flex items-center cursor-pointer text-red-500 hover:bg-slate-700 hover:text-red-400">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No campaigns found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 