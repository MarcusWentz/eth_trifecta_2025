"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowUpRight, 
  BadgeCheck, 
  Gift, 
  CreditCard, 
  ChevronRight,
  Diamond,
  Clock,
  Star,
  Sparkles
} from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function RewardsPage() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rewardPoints, setRewardPoints] = useState(376)
  const [selectedReward, setSelectedReward] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRewardSelect = (id: string) => {
    setSelectedReward(id === selectedReward ? null : id)
  }

  const handleRedeem = () => {
    if (!selectedReward) return
    
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setRewardPoints(prev => prev - parseInt(selectedReward))
      setSelectedReward(null)
      setLoading(false)
    }, 1500)
  }

  if (!mounted) return null

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              You need to connect your wallet to view and redeem rewards
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <ConnectButton />
          </CardFooter>
        </Card>
      </div>
    )
  }

  const rewards = [
    { 
      id: "10",
      name: "Amazon Gift Card",
      description: "10 ZKT for a $10 Amazon Gift Card",
      category: "Gift Cards",
      points: 10,
      image: "gift-card"
    },
    { 
      id: "25",
      name: "Netflix 1-Month",
      description: "25 ZKT for a 1-month Netflix subscription",
      category: "Streaming",
      points: 25,
      image: "streaming"
    },
    { 
      id: "50",
      name: "Ethereum (0.01 ETH)",
      description: "50 ZKT for 0.01 ETH directly to your wallet",
      category: "Crypto",
      points: 50,
      image: "crypto"
    },
    { 
      id: "100",
      name: "Apple Gift Card",
      description: "100 ZKT for a $100 Apple Gift Card",
      category: "Gift Cards",
      points: 100,
      image: "gift-card"
    },
    { 
      id: "150",
      name: "Premium NFT",
      description: "150 ZKT for an exclusive Sovereign Ads NFT collectible",
      category: "NFT",
      points: 150,
      image: "nft",
      badge: "Limited"
    },
    { 
      id: "200",
      name: "VPN 1-Year",
      description: "200 ZKT for a 1-year premium VPN subscription",
      category: "Privacy",
      points: 200,
      image: "vpn"
    },
  ]

  const rewardCategories = [
    "All Categories",
    "Gift Cards",
    "Streaming",
    "Crypto",
    "NFT",
    "Privacy"
  ]

  const iconMap: Record<string, React.ReactNode> = {
    "gift-card": <CreditCard className="h-6 w-6 text-blue-400" />,
    "streaming": <Clock className="h-6 w-6 text-purple-400" />,
    "crypto": <Diamond className="h-6 w-6 text-green-400" />,
    "nft": <Star className="h-6 w-6 text-yellow-400" />,
    "vpn": <BadgeCheck className="h-6 w-6 text-indigo-400" />
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Rewards Center</h1>
        <p className="text-muted-foreground">Redeem your ZKT tokens for exclusive rewards</p>
      </div>
      
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-800/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                  <Gift className="h-10 w-10 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Available ZKT</p>
                  <h2 className="text-3xl font-bold">{rewardPoints} ZKT</h2>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Next Level: Gold</span>
                  <span className="text-slate-400">376/500</span>
                </div>
                <Progress value={75.2} className="w-full md:w-60 h-2" />
                <p className="text-xs text-slate-500">Earn 124 more tokens to reach Gold Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Tabs defaultValue="All Categories" className="w-full">
          <TabsList className="bg-slate-800/50 border border-slate-700 p-1 h-auto flex-wrap">
            {rewardCategories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-indigo-600 px-4 py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {rewards.map((reward) => (
          <Card 
            key={reward.id} 
            className={`cursor-pointer transition-all duration-300 overflow-hidden ${
              selectedReward === reward.id 
                ? "border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                : "border-slate-800/70 hover:border-slate-700"
            }`}
            onClick={() => handleRewardSelect(reward.id)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
              <div className="absolute top-4 left-4 bg-slate-900/90 p-2 rounded-lg z-20">
                {iconMap[reward.image]}
              </div>
              {reward.badge && (
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                    {reward.badge}
                  </Badge>
                </div>
              )}
              <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-700"></div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{reward.name}</h3>
                <Badge variant="outline" className="bg-indigo-900/20 border-indigo-800/30">
                  {reward.points} ZKT
                </Badge>
              </div>
              <p className="text-sm text-slate-400 mb-4">{reward.description}</p>
              <div className="flex items-center text-xs text-slate-500">
                <Badge variant="outline" className="mr-2 text-xs bg-slate-800/50">
                  {reward.category}
                </Badge>
                {selectedReward === reward.id && (
                  <span className="ml-auto flex items-center text-indigo-400">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    Selected
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="fixed bottom-8 right-8 left-8 md:left-auto bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl z-40">
        <div>
          <p className="text-sm text-slate-400">
            {selectedReward ? `Ready to redeem ${selectedReward} ZKT` : "Select a reward to redeem"}
          </p>
        </div>
        <Button 
          disabled={!selectedReward || loading || parseInt(selectedReward || "0") > rewardPoints}
          className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          onClick={handleRedeem}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Redeem Reward
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 