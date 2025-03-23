"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { 
  Tag, 
  Star, 
  Music, 
  Film, 
  Laptop, 
  ShoppingBag, 
  Utensils, 
  Plane, 
  Home, 
  BookOpen, 
  Activity, 
  Sparkles, 
  Info,
  AlertCircle,
  CheckCircle,
  MapPin,
  Globe,
  Target,
  ChevronRight,
  Loader2,
  Shield
} from "lucide-react"
import { Toast } from "@/components/ui/toast-notification"

// Interest categories with icons
const interestCategories = [
  { name: "Technology", icon: Laptop, selected: false },
  { name: "Entertainment", icon: Film, selected: false },
  { name: "Music", icon: Music, selected: false },
  { name: "Fashion", icon: ShoppingBag, selected: false },
  { name: "Food", icon: Utensils, selected: false },
  { name: "Travel", icon: Plane, selected: false },
  { name: "Home", icon: Home, selected: false },
  { name: "Education", icon: BookOpen, selected: false },
  { name: "Fitness", icon: Activity, selected: false },
  { name: "Finance", icon: Star, selected: false },
]

export default function InterestsPage() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  // Interest state management
  const [categories, setCategories] = useState(interestCategories)
  const [topics, setTopics] = useState("")
  
  // Demographic data
  const [age, setAge] = useState<number>(25)
  const [locationPermission, setLocationPermission] = useState<boolean>(false)
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [targetedSites, setTargetedSites] = useState<string>("")
  
  // Form submission state
  const [loadingInterests, setLoadingInterests] = useState<boolean>(false)
  const [errorInterests, setErrorInterests] = useState<string>("")
  const [successInterests, setSuccessInterests] = useState<boolean>(false)
  
  // Privacy settings
  const [allowPersonalization, setAllowPersonalization] = useState<boolean>(true)
  const [allowAnonymousSharing, setAllowAnonymousSharing] = useState<boolean>(false)
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success")

  useEffect(() => {
    setMounted(true)
    
    // Check for geolocation permission
    if (navigator.permissions && navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(permissionStatus => {
          setLocationPermission(permissionStatus.state === "granted")
          
          if (permissionStatus.state === "granted") {
            getCurrentLocation()
          }
        })
        .catch(err => console.error("Error checking location permission:", err))
    }
  }, [])
  
  // Get current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString())
        setLongitude(position.coords.longitude.toString())
        setErrorInterests("")
      },
      (error) => {
        console.error("Error getting location:", error)
        setErrorInterests("Unable to get your location. Please enter coordinates manually.")
        setLocationPermission(false)
      }
    )
  }

  const toggleCategory = (categoryName: string) => {
    setCategories(
      categories.map((category) =>
        category.name === categoryName
          ? { ...category, selected: !category.selected }
          : category
      )
    )
  }
  
  const handleSubmitInterests = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingInterests(true)
    setErrorInterests("")
    setSuccessInterests(false)
    
    try {
      // Get selected categories
      const selectedCategories = categories
        .filter(category => category.selected)
        .map(category => category.name)
      
      // Get topics as an array
      const topicsList = topics
        .split(',')
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0)
        
      // Validate input
      if (selectedCategories.length === 0 && topicsList.length === 0) {
        throw new Error("Please select at least one interest category or enter specific topics")
      }
      
      // Validate location if permission is granted
      if (locationPermission) {
        if (!latitude || !longitude) {
          throw new Error("Location coordinates are required")
        }
        
        const lat = parseFloat(latitude)
        const lng = parseFloat(longitude)
        
        if (isNaN(lat) || isNaN(lng)) {
          throw new Error("Location coordinates must be valid numbers")
        }
        
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          throw new Error("Location coordinates are out of valid range")
        }
      }
      
      // Prepare domains list
      const domains = targetedSites
        .split(',')
        .map(domain => domain.trim())
        .filter(domain => domain.length > 0)
      
      // Prepare data to send to backend
      const interestsData = {
        categories: selectedCategories,
        topics: topicsList,
        age,
        location: locationPermission ? { latitude: parseFloat(latitude), longitude: parseFloat(longitude) } : null,
        targeted_sites: domains,
        privacy: {
          allow_personalization: allowPersonalization,
          allow_anonymous_sharing: allowAnonymousSharing
        }
      }
      
      console.log("Sending interests data:", interestsData)
      
      // Send data to backend
      const response = await fetch("http://localhost:8080/api/user-interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interestsData),
      })
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Success:", data)
      
      // Show success toast
      setToastMessage("Your interests have been saved successfully!")
      setToastVariant("success")
      setShowToast(true)
      setSuccessInterests(true)
      
    } catch (error) {
      setErrorInterests(error instanceof Error ? error.message : "Failed to save interests")
      
      // Show error toast
      setToastMessage(error instanceof Error ? error.message : "Failed to save interests")
      setToastVariant("error")
      setShowToast(true)
    } finally {
      setLoadingInterests(false)
    }
  }

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
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Ad Interests</h1>
        <p className="text-muted-foreground">Customize what ads you'd like to see while preserving your privacy</p>
      </div>

      <Tabs defaultValue="interests" className="w-full">
        <TabsList className="bg-slate-900/80 border border-slate-800 mb-6">
          <TabsTrigger value="interests">
            <Tag className="h-4 w-4 mr-2" />
            Interests
          </TabsTrigger>
          <TabsTrigger value="demographics">
            <Target className="h-4 w-4 mr-2" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmitInterests}>
          <TabsContent value="interests" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-indigo-400" />
                  Interest Categories
                </CardTitle>
                <CardDescription>
                  Select categories that interest you to see more relevant ads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-4 text-sm">
                  <h4 className="font-medium text-indigo-400 mb-1">Your Privacy is Protected</h4>
                  <p className="text-slate-300">
                    Your selected categories are processed using zero-knowledge proofs, ensuring advertisers can target your interests without seeing your personal data.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        category.selected
                          ? "bg-indigo-600/20 border border-indigo-600/40 text-indigo-400"
                          : "bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800"
                      }`}
                      onClick={() => toggleCategory(category.name)}
                    >
                      <category.icon className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium text-center">{category.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specific-topics">Specific Topics (comma separated)</Label>
                  <Textarea
                    id="specific-topics"
                    placeholder="e.g. blockchain, electric vehicles, sustainable fashion"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    className="h-20 bg-slate-950 border-slate-800"
                  />
                  <p className="text-xs text-slate-400">
                    Add specific topics you're interested in, separated by commas
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-400" />
                  Demographics
                </CardTitle>
                <CardDescription>
                  Customize your demographic information for better ad targeting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="age">Age: {age}</Label>
                      <Badge variant="outline" className="bg-slate-800/80">{age} years</Badge>
                    </div>
                    <Slider
                      id="age"
                      min={18}
                      max={100}
                      step={1}
                      value={[age]}
                      onValueChange={(value) => setAge(value[0])}
                    />
                    <p className="text-xs text-slate-400">
                      Age helps match you with age-appropriate and relevant content
                    </p>
                  </div>
                  
                  <div className="space-y-3 pb-4 border-b border-slate-800">
                    <Label className="flex flex-row items-center justify-between">
                      <div>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-indigo-400" />
                          Share Location
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                          Allows for local offers and content relevant to your area
                        </p>
                      </div>
                      <Switch
                        checked={locationPermission}
                        onCheckedChange={setLocationPermission}
                      />
                    </Label>
                    
                    {locationPermission && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="latitude">Latitude</Label>
                          <div className="flex gap-2">
                            <Input
                              id="latitude"
                              placeholder="e.g. 37.7749"
                              value={latitude}
                              onChange={(e) => setLatitude(e.target.value)}
                              className="bg-slate-950 border-slate-800"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="longitude">Longitude</Label>
                          <div className="flex gap-2">
                            <Input
                              id="longitude"
                              placeholder="e.g. -122.4194"
                              value={longitude}
                              onChange={(e) => setLongitude(e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={getCurrentLocation}
                              className="bg-slate-800 hover:bg-slate-700 border-slate-700"
                              title="Use my current location"
                            >
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="targeted-sites" className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-indigo-400" />
                      Preferred Websites
                    </Label>
                    <Textarea
                      id="targeted-sites"
                      placeholder="e.g. github.com, netflix.com, amazon.com (comma separated)"
                      value={targetedSites}
                      onChange={(e) => setTargetedSites(e.target.value)}
                      className="h-20 bg-slate-950 border-slate-800"
                    />
                    <p className="text-xs text-slate-400">
                      Enter websites where you'd like to see ads. This helps match you with content from advertisers you might be interested in.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-indigo-400" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control how your ad preferences are used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-sm">
                  <h4 className="font-medium text-green-400 mb-1 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Zero-Knowledge Privacy
                  </h4>
                  <p className="text-slate-300">
                    Sovereign Ads uses zero-knowledge proofs to match ads with your interests while preserving your privacy. Your personal data never leaves your device.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="pt-2">
                    <Label className="flex flex-row items-center justify-between">
                      <div>
                        <span className="flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-indigo-400" />
                          Allow Personalized Ads
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                          Improve ad relevance using zero-knowledge targeting
                        </p>
                      </div>
                      <Switch
                        checked={allowPersonalization}
                        onCheckedChange={setAllowPersonalization}
                      />
                    </Label>
                  </div>
                  
                  <div className="pt-2">
                    <Label className="flex flex-row items-center justify-between">
                      <div>
                        <span className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-indigo-400" />
                          Allow Anonymous Data Sharing
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                          Contribute anonymized data to improve the platform (never linked to your identity)
                        </p>
                      </div>
                      <Switch
                        checked={allowAnonymousSharing}
                        onCheckedChange={setAllowAnonymousSharing}
                      />
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {errorInterests && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{errorInterests}</span>
              </div>
            )}
            
            {successInterests && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Your preferences have been saved successfully!</span>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loadingInterests}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {loadingInterests ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving Preferences...
                </>
              ) : (
                <>
                  Save All Preferences
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </TabsContent>
        </form>
      </Tabs>
      
      {/* Toast notification */}
      {showToast && (
        <Toast 
          variant={toastVariant}
          position="top-center"
          message={toastMessage}
          onClose={() => setShowToast(false)}
          autoClose={true}
          autoCloseTime={5000}
        />
      )}
    </div>
  )
} 