"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, UploadCloud } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function CreateAdPage() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  )

  // Form state
  const [adTitle, setAdTitle] = useState("")
  const [adDescription, setAdDescription] = useState("")
  const [budget, setBudget] = useState(500)
  const [targetAudience, setTargetAudience] = useState({
    ageMin: 18,
    ageMax: 65,
    interestTags: [""],
    locations: [""],
  })
  const [adMedia, setAdMedia] = useState<File | null>(null)
  const [isPrivacyPreserving, setIsPrivacyPreserving] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to home if not connected
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/')
    }
  }, [isConnected, mounted, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit ad campaign
    console.log({
      adTitle,
      adDescription,
      budget,
      targetAudience,
      endDate: date,
      isPrivacyPreserving
    })
    // Reset form
    setAdTitle("")
    setAdDescription("")
    setBudget(500)
    setTargetAudience({
      ageMin: 18,
      ageMax: 65,
      interestTags: [""],
      locations: [""],
    })
    setAdMedia(null)
    // Redirect to dashboard
    router.push('/dashboard')
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
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Create New Ad Campaign
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>
                  Basic information about your ad campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adTitle">Campaign Name</Label>
                  <Input
                    id="adTitle"
                    placeholder="Enter campaign name"
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    className="bg-slate-800/50 border-slate-700"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adDescription">Description</Label>
                  <Textarea
                    id="adDescription"
                    placeholder="Enter campaign description"
                    value={adDescription}
                    onChange={(e) => setAdDescription(e.target.value)}
                    className="min-h-[120px] bg-slate-800/50 border-slate-700"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adType">Ad Type</Label>
                  <Select defaultValue="display">
                    <SelectTrigger className="bg-slate-800/50 border-slate-700">
                      <SelectValue placeholder="Select ad type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="display">Display Ad</SelectItem>
                      <SelectItem value="video">Video Ad</SelectItem>
                      <SelectItem value="native">Native Ad</SelectItem>
                      <SelectItem value="interactive">Interactive Ad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-slate-800/50 border-slate-700",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) =>
                          date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Audience Targeting</CardTitle>
                <CardDescription>
                  Define who you want to see your ad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Age Range</Label>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{targetAudience.ageMin}</span>
                    <span className="text-sm">{targetAudience.ageMax}</span>
                  </div>
                  <div className="flex gap-4">
                    <Input 
                      type="number" 
                      min="13" 
                      max="100" 
                      value={targetAudience.ageMin}
                      onChange={(e) => setTargetAudience({...targetAudience, ageMin: parseInt(e.target.value)})}
                      className="w-20 bg-slate-800/50 border-slate-700"
                    />
                    <div className="flex-1 flex items-center">
                      <div className="h-2 bg-slate-700 rounded-full w-full"></div>
                    </div>
                    <Input 
                      type="number" 
                      min="13" 
                      max="100" 
                      value={targetAudience.ageMax}
                      onChange={(e) => setTargetAudience({...targetAudience, ageMax: parseInt(e.target.value)})}
                      className="w-20 bg-slate-800/50 border-slate-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma separated)</Label>
                  <Textarea
                    id="interests"
                    placeholder="technology, gaming, finance, etc."
                    className="bg-slate-800/50 border-slate-700"
                    onChange={(e) => setTargetAudience({
                      ...targetAudience, 
                      interestTags: e.target.value.split(",").map(tag => tag.trim())
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="locations">Locations (comma separated)</Label>
                  <Textarea
                    id="locations"
                    placeholder="New York, Los Angeles, Remote, etc."
                    className="bg-slate-800/50 border-slate-700"
                    onChange={(e) => setTargetAudience({
                      ...targetAudience, 
                      locations: e.target.value.split(",").map(location => location.trim())
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Budget & Bidding</CardTitle>
                <CardDescription>
                  Set your campaign budget and bidding strategy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="budget">Total Budget</Label>
                    <span className="font-medium">${budget}</span>
                  </div>
                  <Input
                    id="budget"
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="bg-slate-800/50 border-slate-700"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$100</span>
                    <span>$10,000</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bidStrategy">Bidding Strategy</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger className="bg-slate-800/50 border-slate-700">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Automatic Bidding</SelectItem>
                      <SelectItem value="manual">Manual CPC</SelectItem>
                      <SelectItem value="target">Target CPA</SelectItem>
                      <SelectItem value="maximize">Maximize Conversions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="privacy">Privacy-Preserving Mode</Label>
                      <p className="text-sm text-muted-foreground">Use zero-knowledge proofs to protect user privacy</p>
                    </div>
                    <Switch
                      id="privacy"
                      checked={isPrivacyPreserving}
                      onCheckedChange={setIsPrivacyPreserving}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Ad Creative</CardTitle>
                <CardDescription>
                  Upload your ad creative content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <UploadCloud className="h-8 w-8 mx-auto mb-4 text-slate-500" />
                  <h3 className="text-sm font-medium mb-1">Upload Creative</h3>
                  <p className="text-xs text-muted-foreground mb-4">Drag & drop or click to upload</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    id="file-upload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAdMedia(e.target.files[0])
                      }
                    }} 
                  />
                  <label htmlFor="file-upload">
                    <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-700">
                      Select File
                    </Button>
                  </label>
                  {adMedia && (
                    <p className="mt-4 text-sm text-green-400">
                      Selected: {adMedia.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Create Campaign
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
} 