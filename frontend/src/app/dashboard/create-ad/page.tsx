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
import { CalendarIcon, UploadCloud, Shield, Globe, MapPin, Plus, Trash } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Upload, 
  Image, 
  FileText, 
  Users, 
  Target, 
  Loader2, 
  Info, 
  Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

  // Demographics targeting state
  const [minAge, setMinAge] = useState("18")
  const [maxAge, setMaxAge] = useState("65")
  const [targetDomains, setTargetDomains] = useState("")
  
  // Geofencing state
  const [coordinates, setCoordinates] = useState<[number, number][]>([])
  const [newLat, setNewLat] = useState("")
  const [newLng, setNewLng] = useState("")
  
  // Form submission state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to home if not connected
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/')
    }
  }, [isConnected, mounted, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    
    // Validate form
    if (!adTitle || !adDescription || !budget || !targetAudience.interestTags.length || !targetAudience.locations.length || !coordinates.length) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }
    
    // Additional validation for coordinates if targeting tab is active
    if (coordinates.length < 3) {
      setError("Please add at least 3 coordinates for geofencing")
      setLoading(false)
      return
    }
    
    // Prepare domain list
    const domains = targetDomains
      .split(',')
      .map(domain => domain.trim())
      .filter(domain => domain.length > 0)
    
    // Prepare campaign data
    const campaignData = {
      title: adTitle,
      description: adDescription,
      budget: budget.toString(),
      image_url: adMedia ? URL.createObjectURL(adMedia) : '',
      cta_text: 'Learn More',
      cta_url: 'https://example.com',
      format: 'display',
      targeting: {
        age_range: [parseInt(minAge), parseInt(maxAge)],
        geofence: coordinates,
        target_domains: domains
      }
    }
    
    try {
      const res = await fetch("http://localhost:8080/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      })
      
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`)
      }
      
      const data = await res.json()
      console.log("Success:", data)
      setSuccess(true)
      
      // Redirect to success page after a brief delay to show success message
      setTimeout(() => {
        // Convert all values to strings to avoid type issues
        const campaignId = data.id ? String(data.id) : '123456';
        const budgetStr = String(budget);
        const minAgeStr = String(minAge);
        const maxAgeStr = String(maxAge);
        const domainsStr = domains.join(',');
        
        // Create the URL with query parameters
        const url = `/dashboard/campaign-success?id=${campaignId}&title=${encodeURIComponent(adTitle)}&budget=${budgetStr}&minAge=${minAgeStr}&maxAge=${maxAgeStr}&domains=${encodeURIComponent(domainsStr)}`;
        router.push(url);
      }, 1500)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create campaign")
    } finally {
      setLoading(false)
    }
  }

  const addCoordinate = () => {
    if (newLat && newLng) {
      try {
        const lat = parseFloat(newLat)
        const lng = parseFloat(newLng)
        
        if (isNaN(lat) || isNaN(lng)) {
          throw new Error("Coordinates must be valid numbers")
        }
        
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          throw new Error("Coordinates out of valid range")
        }
        
        setCoordinates([...coordinates, [lat, lng]])
        setNewLat("")
        setNewLng("")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid coordinates")
      }
    }
  }
  
  const removeCoordinate = (index: number) => {
    setCoordinates(coordinates.filter((_, i) => i !== index))
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
            
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Target Websites</CardTitle>
                <CardDescription>
                  Define websites where your target audience is likely to visit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="target-domains">Websites (comma separated)</Label>
                  <Textarea
                    id="target-domains"
                    placeholder="e.g. github.com, netflix.com, amazon.com"
                    value={targetDomains}
                    onChange={(e) => setTargetDomains(e.target.value)}
                    className="h-20 bg-slate-800/50 border-slate-700"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Geographic Targeting</CardTitle>
                <CardDescription>
                  Define a geofence for your campaign (add at least 3 points)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-lat">Latitude</Label>
                      <Input
                        id="new-lat"
                        placeholder="e.g. 37.7749"
                        value={newLat}
                        onChange={(e) => setNewLat(e.target.value)}
                        className="bg-slate-800/50 border-slate-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-lng">Longitude</Label>
                      <div className="flex gap-2">
                        <Input
                          id="new-lng"
                          placeholder="e.g. -122.4194"
                          value={newLng}
                          onChange={(e) => setNewLng(e.target.value)}
                          className="bg-slate-800/50 border-slate-700"
                        />
                        <Button 
                          type="button"
                          onClick={addCoordinate}
                          variant="outline"
                          className="bg-slate-800 hover:bg-slate-700 border-slate-700"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-slate-800 bg-slate-900 p-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-indigo-400" />
                      Geofence Coordinates
                    </h4>
                    
                    {coordinates.length === 0 ? (
                      <p className="text-sm text-slate-400 italic">No coordinates added yet</p>
                    ) : (
                      <div className="space-y-2">
                        {coordinates.map((coord, index) => (
                          <div key={index} className="flex items-center justify-between rounded bg-slate-900 px-3 py-2">
                            <code className="text-xs text-slate-300">
                              [{coord[0].toFixed(6)}, {coord[1].toFixed(6)}]
                            </code>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCoordinate(index)}
                              className="h-7 w-7 p-0 text-slate-400 hover:text-red-400"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs text-slate-400 flex items-center">
                      <Info className="h-3 w-3 mr-1 text-amber-500" />
                      {coordinates.length < 3 
                        ? `Add at least ${3 - coordinates.length} more ${coordinates.length === 2 ? 'point' : 'points'} to create a geofence`
                        : 'Geofence is valid with minimum 3 points'
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <TabsContent value="targeting" className="space-y-4">
              <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-4 text-sm mb-4">
                <h4 className="font-medium text-indigo-400 mb-1 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy-Preserving Targeting
                </h4>
                <p className="text-slate-300">
                  ZKads uses zero-knowledge proofs to match your campaign with users who match your criteria, without ever revealing their personal data.
                </p>
              </div>
              
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-indigo-400" />
                    Demographic Targeting
                  </CardTitle>
                  <CardDescription>
                    Define your target audience with privacy-preserving demographics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Age Range ({minAge} - {maxAge})</Label>
                        <span className="text-sm text-slate-400">{minAge} - {maxAge} years</span>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Input
                          type="number"
                          min="18"
                          max="100"
                          value={minAge}
                          onChange={(e) => setMinAge(e.target.value)}
                          className="w-20 bg-slate-950 border-slate-800"
                        />
                        <Slider 
                          min={18}
                          max={100}
                          step={1}
                          value={[parseInt(minAge), parseInt(maxAge)]}
                          onValueChange={(value) => {
                            setMinAge(value[0].toString())
                            setMaxAge(value[1].toString())
                          }}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          min="18"
                          max="100"
                          value={maxAge}
                          onChange={(e) => setMaxAge(e.target.value)}
                          className="w-20 bg-slate-950 border-slate-800"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Target users within a specific age range. Users' actual age is never revealed to advertisers.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="target-domains" className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-indigo-400" />
                        Target Websites
                      </Label>
                      <Textarea
                        id="target-domains"
                        placeholder="e.g. github.com, netflix.com, amazon.com (comma separated)"
                        value={targetDomains}
                        onChange={(e) => setTargetDomains(e.target.value)}
                        className="h-20 bg-slate-950 border-slate-800"
                      />
                      <p className="text-xs text-slate-400">
                        ZKads will show your ads to users who visit these sites. User browsing history is never shared with advertisers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-400" />
                    Geographic Targeting
                  </CardTitle>
                  <CardDescription>
                    Define a geofence for your campaign (add at least 3 points)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new-lat">Latitude</Label>
                        <Input
                          id="new-lat"
                          placeholder="e.g. 37.7749"
                          value={newLat}
                          onChange={(e) => setNewLat(e.target.value)}
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-lng">Longitude</Label>
                        <div className="flex gap-2">
                          <Input
                            id="new-lng"
                            placeholder="e.g. -122.4194"
                            value={newLng}
                            onChange={(e) => setNewLng(e.target.value)}
                            className="bg-slate-950 border-slate-800"
                          />
                          <Button 
                            type="button"
                            onClick={addCoordinate}
                            variant="outline"
                            className="bg-slate-800 hover:bg-slate-700 border-slate-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-indigo-400" />
                        Geofence Coordinates
                      </h4>
                      
                      {coordinates.length === 0 ? (
                        <p className="text-sm text-slate-400 italic">No coordinates added yet</p>
                      ) : (
                        <div className="space-y-2">
                          {coordinates.map((coord, index) => (
                            <div key={index} className="flex items-center justify-between rounded bg-slate-900 px-3 py-2">
                              <code className="text-xs text-slate-300">
                                [{coord[0].toFixed(6)}, {coord[1].toFixed(6)}]
                              </code>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCoordinate(index)}
                                className="h-7 w-7 p-0 text-slate-400 hover:text-red-400"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs text-slate-400 flex items-center">
                        <Info className="h-3 w-3 mr-1 text-amber-500" />
                        {coordinates.length < 3 
                          ? `Add at least ${3 - coordinates.length} more ${coordinates.length === 2 ? 'point' : 'points'} to create a geofence`
                          : 'Geofence is valid with minimum 3 points'
                        }
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400">
                      ZKads matches your ads with users in the defined geographic area without ever revealing their exact location to advertisers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <p className="text-sm text-slate-300">
                  Your campaign will be matched with users using privacy-preserving zero-knowledge proofs
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Campaign...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Launch Campaign
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
} 