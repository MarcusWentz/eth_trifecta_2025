"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LockKeyhole, 
  LineChart, 
  ShieldCheck, 
  Sparkles, 
  Gift, 
  MegaphoneIcon, 
  ChevronRight,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [userType, setUserType] = useState<'advertiser' | 'user' | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const redirectToDashboard = () => {
    if (isConnected) {
      if (userType === 'advertiser') {
        router.push('/dashboard')
      } else if (userType === 'user') {
        router.push('/user-dashboard')
      }
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/90 z-10"></div>
        </div>

        <div className="container mx-auto text-center z-30 px-6 relative">
          <div className="mb-6 inline-flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-slate-300">Privacy-First Advertising with Zero-Knowledge Proofs</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            ZKads: Beyond Privacy
          </h1>
          
          <h2 className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
            The first blockchain platform that rewards users for viewing ads while preserving privacy through zero-knowledge proofs
          </h2>
          
          <Tabs 
            defaultValue="user" 
            className="w-full max-w-3xl mx-auto"
            onValueChange={(value) => setUserType(value as 'advertiser' | 'user')}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              <TabsTrigger 
                value="user" 
                className="relative overflow-hidden data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-800 data-[state=active]:text-white data-[state=active]:shadow-lg py-6 px-8 text-lg font-semibold transition-all duration-300 hover:bg-slate-800/30 group"
              >
                <div className="flex items-center justify-center gap-3">
                  <Gift className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">For Users</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </TabsTrigger>
              <TabsTrigger 
                value="advertiser" 
                className="relative overflow-hidden data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-800 data-[state=active]:text-white data-[state=active]:shadow-lg py-6 px-8 text-lg font-semibold transition-all duration-300 hover:bg-slate-800/30 group"
              >
                <div className="flex items-center justify-center gap-3">
                  <MegaphoneIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">For Advertisers</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="transform transition-all duration-300 ease-in-out">
              <div className="p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-xl hover:shadow-blue-900/20 transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-500/10 rounded-full mb-6">
                    <Gift className="h-12 w-12 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Get Rewarded for Your Attention</h3>
                  <p className="text-slate-300 mb-8 max-w-lg">
                    View relevant ads while browsing, earn tokens, and maintain complete privacy over your data
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {mounted && !isConnected ? (
                      <div className="w-full">
                        <ConnectButton label="Connect Wallet" />
                      </div>
                    ) : (
                      <Button 
                        onClick={redirectToDashboard}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                        size="lg"
                      >
                        Enter User Dashboard
                        <ChevronRight className="ml-2 h-5 w-5 animate-pulse" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advertiser" className="transform transition-all duration-300 ease-in-out">
              <div className="p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-xl hover:shadow-purple-900/20 transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-purple-500/10 rounded-full mb-6">
                    <LineChart className="h-12 w-12 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Target Audiences, Not Individuals</h3>
                  <p className="text-slate-300 mb-8 max-w-lg">
                    Create targeted campaigns that respect user privacy through zero-knowledge verification
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {mounted && !isConnected ? (
                      <div className="w-full">
                        <ConnectButton label="Connect Wallet" />
                      </div>
                    ) : (
                      <Button 
                        onClick={redirectToDashboard}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
                        size="lg"
                      >
                        Enter Advertiser Dashboard
                        <ChevronRight className="ml-2 h-5 w-5 animate-pulse" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center animate-bounce mt-12">
            <ChevronRight className="h-6 w-6 text-slate-400 rotate-90" />
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="w-full py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How Sovereign Ads Works
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Privacy-preserving advertising that benefits both users and advertisers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* For Users */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 mr-4">
                  <Gift className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">For Users</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Install Extension</h4>
                    <p className="text-slate-400">Download the ZKads browser extension to get started</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Set Your Preferences</h4>
                    <p className="text-slate-400">Choose interests that match your preferences for more relevant ads</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">View Ads & Earn Rewards</h4>
                    <p className="text-slate-400">Get rewarded in tokens for the ads you view while browsing</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Redeem Your Rewards</h4>
                    <p className="text-slate-400">Cash out your earnings or use them across the ZKads ecosystem</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  asChild
                  variant="outline" 
                  className="border-blue-600 hover:bg-blue-600/10 text-blue-400"
                >
                  <Link href="/user-dashboard">
                    Learn More About User Rewards
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* For Advertisers */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400 mr-4">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">For Advertisers</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Create Your Campaign</h4>
                    <p className="text-slate-400">Set up your targeting criteria and upload your ad creatives</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Set Your Budget</h4>
                    <p className="text-slate-400">Define your spending limits and bidding strategy</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Target by Interest, Not Identity</h4>
                    <p className="text-slate-400">Reach users who match your criteria without accessing personal data</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Monitor Performance</h4>
                    <p className="text-slate-400">Track campaign metrics through our advanced analytics dashboard</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  asChild
                  variant="outline" 
                  className="border-purple-600 hover:bg-purple-600/10 text-purple-400"
                >
                  <Link href="/dashboard">
                    Learn More About Advertising
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Innovative technology for a new age of digital advertising
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-hover bg-slate-900/50 rounded-xl border border-slate-800 p-8">
              <div className="bg-blue-500/10 w-14 h-14 rounded-lg mb-6 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Privacy-Preserving</h3>
              <p className="text-slate-300">
                Zero-knowledge proofs verify ad matching without revealing user data, keeping personal information completely private.
              </p>
            </div>
            
            <div className="card-hover bg-slate-900/50 rounded-xl border border-slate-800 p-8">
              <div className="bg-purple-500/10 w-14 h-14 rounded-lg mb-6 flex items-center justify-center">
                <Gift className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">User Rewards</h3>
              <p className="text-slate-300">
                Users earn tokens for their attention, creating a fair value exchange for participating in the ad ecosystem.
              </p>
            </div>
            
            <div className="card-hover bg-slate-900/50 rounded-xl border border-slate-800 p-8">
              <div className="bg-yellow-500/10 w-14 h-14 rounded-lg mb-6 flex items-center justify-center">
                <LockKeyhole className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Blockchain Secured</h3>
              <p className="text-slate-300">
                All transactions and proof verifications are secured on the blockchain for transparency and trust.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loved by Users & Advertisers
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              See what our community is saying about ZKads
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-medium">Sarah K.</h4>
                  <p className="text-sm text-slate-400">User</p>
                </div>
              </div>
              <p className="text-slate-300">
                "I love that I can earn rewards just for seeing ads that are actually relevant to me. And knowing my data stays private is a huge plus!"
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-medium">Michael T.</h4>
                  <p className="text-sm text-slate-400">Advertiser</p>
                </div>
              </div>
              <p className="text-slate-300">
                "ZKads has transformed our approach to digital marketing. We're reaching the right audiences while respecting privacy, and our ROI has never been better."
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-medium">Lisa R.</h4>
                  <p className="text-sm text-slate-400">User</p>
                </div>
              </div>
              <p className="text-slate-300">
                "I've earned enough tokens to cover my monthly streaming subscription. It's amazing to finally get value from my online attention."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-blue-900/40 to-purple-900/40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join the privacy-first advertising revolution today
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-6 text-lg rounded-lg"
            >
              <Link href="/user-dashboard">
                For Users
                <Gift className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-6 text-lg rounded-lg"
            >
              <Link href="/dashboard">
                For Advertisers
                <LineChart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Sparkles className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ZKads
              </span>
            </div>
            
            <div className="flex gap-6">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} ZKads. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
