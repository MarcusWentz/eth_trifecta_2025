"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, ChevronRight, BarChart, Eye, Settings, Clock } from "lucide-react"
import Link from "next/link"

export default function CampaignSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [campaignData, setCampaignData] = useState<any>(null)
  
  useEffect(() => {
    setMounted(true)
    
    // Get campaign ID from URL
    const campaignId = searchParams.get('id')
    
    if (campaignId) {
      // In a real app, fetch campaign details from API
      // For now, we'll use mock data
      setCampaignData({
        id: campaignId,
        title: searchParams.get('title') || 'New Campaign',
        status: 'Active',
        created: new Date().toISOString(),
        budget: searchParams.get('budget') || '100',
        targeting: {
          age: [
            parseInt(searchParams.get('minAge') || '18'),
            parseInt(searchParams.get('maxAge') || '65')
          ],
          domains: searchParams.get('domains')?.split(',') || [],
          locations: 'Custom Geofence'
        }
      })
    } else {
      // If no campaign ID, redirect to dashboard
      router.push('/dashboard/manage-ads')
    }
  }, [searchParams, router])
  
  if (!mounted || !campaignData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Created!</h1>
            <p className="text-muted-foreground">Your campaign is now live and ready to reach users</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-indigo-400" />
              Campaign Details
            </CardTitle>
            <CardDescription>
              Summary of your new campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Campaign Name</span>
                <span className="font-medium">{campaignData.title}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Status</span>
                <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded">
                  {campaignData.status}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Budget</span>
                <span className="font-medium">${campaignData.budget}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Created</span>
                <span className="font-medium">
                  {new Date(campaignData.created).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Target Age</span>
                <span className="font-medium">
                  {campaignData.targeting.age[0]} - {campaignData.targeting.age[1]}
                </span>
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium text-slate-300 mb-2">Target Domains</h4>
              <div className="flex flex-wrap gap-2">
                {campaignData.targeting.domains && campaignData.targeting.domains.length > 0 ? (
                  campaignData.targeting.domains.map((domain: string, index: number) => (
                    <span key={index} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded">
                      {domain}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm italic">No domains specified</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowRight className="h-5 w-5 mr-2 text-indigo-400" />
              Next Steps
            </CardTitle>
            <CardDescription>
              What to do with your new campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full w-8 h-8 bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <BarChart className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Monitor Performance</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Track impressions, clicks and conversions in real-time on your dashboard
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full w-8 h-8 bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Settings className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Optimize Your Campaign</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Make adjustments based on performance to improve your results
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full w-8 h-8 bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Eye className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">View Ad Previews</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    See how your ads appear to users with our preview tool
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full w-8 h-8 bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Clock className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Schedule Reports</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Set up automated reports to keep track of your campaign's performance
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          asChild
          variant="outline"
          className="flex-1 border-slate-700 bg-slate-800/50"
        >
          <Link href="/dashboard/create-ad">
            Create Another Campaign
          </Link>
        </Button>
        
        <Button
          asChild
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Link href="/dashboard/manage-ads">
            Go to Dashboard
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 