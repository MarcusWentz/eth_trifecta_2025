"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  Info, 
  Search, 
  Plus, 
  X, 
  Sliders, 
  ShieldCheck,
  BarChart3,
  Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function InterestsPage() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("categories")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "DeFi", 
    "NFTs", 
    "Gaming", 
    "DAOs", 
    "Layer 2"
  ])
  const [privacySettings, setPrivacySettings] = useState({
    shareBasicInfo: true,
    shareDetailedViews: false,
    allowPersonalized: true,
    anonymizeData: true
  })
  const [rewardsMultiplier, setRewardsMultiplier] = useState(75)
  
  // All available categories
  const allCategories = [
    { id: "defi", name: "DeFi", description: "Decentralized finance platforms and protocols" },
    { id: "nfts", name: "NFTs", description: "Non-fungible tokens, collections and marketplaces" },
    { id: "gaming", name: "Gaming", description: "Blockchain games and metaverse projects" },
    { id: "daos", name: "DAOs", description: "Decentralized autonomous organizations" },
    { id: "layer2", name: "Layer 2", description: "Scaling solutions for Ethereum" },
    { id: "depin", name: "DePIN", description: "Decentralized physical infrastructure networks" },
    { id: "social", name: "Social", description: "Decentralized social media platforms" },
    { id: "yield", name: "Yield Farming", description: "Strategies for earning yield on crypto assets" },
    { id: "privacy", name: "Privacy", description: "Privacy-focused protocols and tools" },
    { id: "identity", name: "Identity", description: "Self-sovereign identity solutions" },
    { id: "interop", name: "Interoperability", description: "Cross-chain bridges and protocols" },
    { id: "oracles", name: "Oracles", description: "Data providers for smart contracts" },
    { id: "lending", name: "Lending", description: "Crypto lending and borrowing platforms" },
    { id: "wallets", name: "Wallets", description: "Cryptocurrency wallet solutions" },
    { id: "analytics", name: "Analytics", description: "On-chain data and analytics tools" },
    { id: "infrastructure", name: "Infrastructure", description: "Core blockchain infrastructure projects" },
    { id: "exchanges", name: "Exchanges", description: "Centralized and decentralized exchanges" },
    { id: "insurance", name: "Insurance", description: "Crypto insurance and coverage protocols" },
  ]

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
              You need to connect your wallet to set your ad preferences
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <ConnectButton />
          </CardFooter>
        </Card>
      </div>
    )
  }

  const filteredCategories = allCategories.filter(category => 
    !selectedCategories.includes(category.name) && 
    (category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     category.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleCategory = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName))
    } else {
      setSelectedCategories([...selectedCategories, categoryName])
    }
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ad Preferences</h1>
        <p className="text-muted-foreground">
          Customize your interests to see more relevant ads and earn more rewards
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-3">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Your Interests</CardTitle>
                  <CardDescription>
                    Select categories that interest you to see more relevant ads
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                    {selectedCategories.length} Selected
                  </Badge>
                  <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50">
                    <Sliders className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
                  <TabsTrigger 
                    value="categories" 
                    className="data-[state=active]:bg-indigo-600"
                  >
                    Categories
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="data-[state=active]:bg-indigo-600"
                  >
                    Privacy Controls
                  </TabsTrigger>
                  <TabsTrigger 
                    value="optimization" 
                    className="data-[state=active]:bg-indigo-600"
                  >
                    Reward Optimization
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="categories" className="mt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <Input 
                        className="pl-10 bg-slate-950/50 border-slate-800 focus:border-indigo-600"
                        placeholder="Search for categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category) => (
                        <Badge 
                          key={category} 
                          variant="secondary"
                          className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 py-1.5 px-3 flex items-center gap-1.5 transition-colors"
                        >
                          {category}
                          <X 
                            className="h-3.5 w-3.5 cursor-pointer hover:text-white transition-colors" 
                            onClick={() => toggleCategory(category)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-slate-400">Suggested Categories</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredCategories.slice(0, 9).map((category) => (
                        <Card 
                          key={category.id} 
                          className="bg-slate-950/60 border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer"
                          onClick={() => toggleCategory(category.name)}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{category.name}</h4>
                              <p className="text-xs text-slate-400 mt-1">{category.description}</p>
                            </div>
                            <Plus className="h-5 w-5 text-indigo-400" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {filteredCategories.length > 9 && (
                      <Button 
                        variant="outline" 
                        className="w-full border-slate-700 bg-slate-800/50 mt-2"
                      >
                        Show More Categories
                      </Button>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <span className="font-medium">Your interests are up to date</span>
                      </div>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="mt-0 space-y-6">
                  <Card className="bg-slate-950/60 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                        Privacy Settings
                      </CardTitle>
                      <CardDescription>
                        Control how your data is used for ad personalization
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="share-basic">Share Basic Information</Label>
                            <p className="text-sm text-slate-400">
                              Allow sharing of non-identifying information for better ad matching
                            </p>
                          </div>
                          <Switch 
                            id="share-basic" 
                            checked={privacySettings.shareBasicInfo}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, shareBasicInfo: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="share-detailed">Share Detailed View Data</Label>
                            <p className="text-sm text-slate-400">
                              Allow collection of detailed ad interaction data
                            </p>
                          </div>
                          <Switch 
                            id="share-detailed" 
                            checked={privacySettings.shareDetailedViews}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, shareDetailedViews: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allow-personalized">Allow Personalized Ads</Label>
                            <p className="text-sm text-slate-400">
                              Receive ads based on your interests and preferences
                            </p>
                          </div>
                          <Switch 
                            id="allow-personalized" 
                            checked={privacySettings.allowPersonalized}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, allowPersonalized: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="anonymize-data">Anonymize Data</Label>
                            <p className="text-sm text-slate-400">
                              Use zero-knowledge proofs to anonymize your data
                            </p>
                          </div>
                          <Switch 
                            id="anonymize-data" 
                            checked={privacySettings.anonymizeData}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, anonymizeData: checked})
                            }
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                          <Info className="h-5 w-5 text-amber-500" />
                          <p className="text-sm text-slate-300">
                            ZKads uses zero-knowledge proofs to verify ad views while preserving your privacy.
                            Your wallet address is never shared with advertisers.
                          </p>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                          Save Privacy Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="optimization" className="mt-0 space-y-6">
                  <Card className="bg-slate-950/60 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        Reward Optimization
                      </CardTitle>
                      <CardDescription>
                        Customize settings to maximize your ZKT token earnings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <Label>Ad Frequency</Label>
                            <Badge 
                              variant="outline" 
                              className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            >
                              {rewardsMultiplier}%
                            </Badge>
                          </div>
                          <Slider 
                            defaultValue={[rewardsMultiplier]} 
                            max={100} 
                            step={5}
                            onValueChange={(value) => setRewardsMultiplier(value[0])}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Less Frequent</span>
                            <span>More Frequent</span>
                          </div>
                        </div>
                        
                        <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-5 w-5 text-indigo-400" />
                            <h4 className="font-medium">Estimated Rewards</h4>
                          </div>
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-slate-950/40 p-3 rounded-md">
                              <div className="text-xs text-slate-400 mb-1">Daily</div>
                              <div className="text-lg font-semibold text-indigo-400">
                                ~{((rewardsMultiplier / 100) * 5).toFixed(2)} ZKT
                              </div>
                            </div>
                            <div className="bg-slate-950/40 p-3 rounded-md">
                              <div className="text-xs text-slate-400 mb-1">Weekly</div>
                              <div className="text-lg font-semibold text-indigo-400">
                                ~{((rewardsMultiplier / 100) * 35).toFixed(2)} ZKT
                              </div>
                            </div>
                            <div className="bg-slate-950/40 p-3 rounded-md">
                              <div className="text-xs text-slate-400 mb-1">Monthly</div>
                              <div className="text-lg font-semibold text-indigo-400">
                                ~{((rewardsMultiplier / 100) * 150).toFixed(2)} ZKT
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400">
                            These estimates are based on your current interests and privacy settings.
                            Actual rewards may vary based on available ad inventory.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Notification Preferences</Label>
                            <p className="text-sm text-slate-400">
                              Get notified when high-reward ads are available
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Reward Boost Opportunities</Label>
                            <p className="text-sm text-slate-400">
                              Receive special offers for increased rewards
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-800">
                        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                          Apply Optimization Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-slate-900/50 border-slate-800 sticky top-24">
            <CardHeader>
              <CardTitle>Interest Profile</CardTitle>
              <CardDescription>
                Your ad preference summary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Profile Completion</span>
                  <span className="text-xs text-slate-300">
                    {selectedCategories.length >= 5 ? "Complete" : `${selectedCategories.length}/5`}
                  </span>
                </div>
                <Progress 
                  value={Math.min(selectedCategories.length / 5 * 100, 100)} 
                  className="h-2 bg-slate-800" 
                />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Your Top Interests</h4>
                <div className="space-y-2">
                  {selectedCategories.slice(0, 3).map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span>{category}</span>
                      <Badge 
                        variant="outline" 
                        className="bg-slate-800/50 border-slate-700"
                      >
                        Primary
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Privacy Level</h4>
                <div className="bg-slate-950/60 p-3 rounded-md border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Basic</span>
                    <span className="text-sm">
                      {privacySettings.anonymizeData ? "Enhanced" : "Standard"}
                    </span>
                    <span className="text-sm">Maximum</span>
                  </div>
                  <Progress 
                    value={privacySettings.anonymizeData ? 75 : 50} 
                    className="h-2 bg-slate-800"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Reward Rate</h4>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-black border-none"
                  >
                    {rewardsMultiplier >= 75 ? "Premium" : 
                     rewardsMultiplier >= 50 ? "Standard" : "Basic"}
                  </Badge>
                  <span className="text-sm text-slate-300">
                    {rewardsMultiplier}% of maximum
                  </span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 mt-4">
                Reset to Default
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 