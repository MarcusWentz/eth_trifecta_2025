"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  LockKeyhole, 
  LineChart, 
  ShieldCheck, 
  Sparkles, 
  Gift, 
  MegaphoneIcon, 
  ChevronRight,
  CheckCircle2,
  MousePointer,
  ArrowRight,
  Globe,
  Zap,
  Eye
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section with 3D gradient bg */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[80px] animate-float"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full filter blur-[80px] animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-500/10 rounded-full filter blur-[60px] animate-float-slow"></div>
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[100px]"></div>
        </div>

        <div className="container mx-auto z-10 px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-4">
              <Sparkles className="h-3 w-3" />
              Privacy-First Web3 Advertising
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-gradient bg-gradient-to-r from-white via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Ads That Respect Your Privacy
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              The future of advertising where users earn rewards without sacrificing privacy
            </p>
          </div>

          {/* User/Advertiser Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* User Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/20 hover:-translate-y-1">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-blue-500/20 to-blue-600/30 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-500/30 group-hover:to-blue-600/40"></div>
              
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">For Users</h3>
                <p className="mb-6 text-slate-300">Get paid for your attention while keeping your data private</p>
                
                <ul className="mb-8 space-y-2">
                  {['Earn tokens for viewing ads', 'Complete privacy with zero-knowledge proofs', 'Choose ad categories you want to see'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {mounted && !isConnected ? (
                  <div className="w-full mb-2">
                    <ConnectButton label="Connect Wallet" />
                  </div>
                ) : (
                  <Link href="/user-dashboard">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 group">
                      Open User Dashboard
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Advertiser Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/20 hover:-translate-y-1">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-purple-500/20 to-purple-600/30 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-500/30 group-hover:to-purple-600/40"></div>
              
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <MegaphoneIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">For Advertisers</h3>
                <p className="mb-6 text-slate-300">Target interested audiences without invading privacy</p>
                
                <ul className="mb-8 space-y-2">
                  {['Target by interest, not identity', 'Verifiable engagement metrics', 'Cost-effective campaigns'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {mounted && !isConnected ? (
                  <div className="w-full mb-2">
                    <ConnectButton label="Connect Wallet" />
                  </div>
                ) : (
                  <Link href="/dashboard">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 group">
                      Open Advertiser Dashboard
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Extension Callout */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 blur-[50px]"></div>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-between relative">
                <div className="sm:max-w-md">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 bg-indigo-500/10 rounded-md flex items-center justify-center">
                      <Zap className="h-4 w-4 text-indigo-400" />
                    </div>
                    <span className="text-white font-medium">Browser Extension</span>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">New</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Start earning rewards instantly</h3>
                  <p className="text-slate-300 mb-6">Download our browser extension to start viewing privacy-respecting ads and earning tokens immediately.</p>
                  <a href="#" className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5">
                    Get the Extension
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
                <div className="sm:w-1/3 flex-shrink-0">
                  <div className="relative h-60 w-full sm:h-72 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                      <img 
                        src="/images/extension-preview.png" 
                        alt="Browser Extension Preview" 
                        className="max-h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='400' viewBox='0 0 320 400'%3E%3Crect width='320' height='400' fill='%23222639'/%3E%3Crect x='20' y='20' width='280' height='40' rx='4' fill='%23333852'/%3E%3Ccircle cx='40' cy='40' r='10' fill='%236366F1'/%3E%3Ctext x='60' y='45' font-family='Arial' font-size='16' fill='white'%3EZKads Extension%3C/text%3E%3Crect x='220' y='30' width='60' height='20' rx='10' fill='%236366F1' opacity='0.5'/%3E%3Ctext x='230' y='45' font-family='Arial' font-size='12' fill='white'%3EConnected%3C/text%3E%3Crect x='20' y='80' width='280' height='100' rx='4' fill='%23333852'/%3E%3Crect x='30' y='95' width='70' height='70' rx='4' fill='%232A2B36'/%3E%3Ctext x='110' y='115' font-family='Arial' font-size='16' fill='white'%3ETotalRewards%3C/text%3E%3Ctext x='110' y='145' font-family='Arial' font-size='24' font-weight='bold' fill='%236366F1'%3E125 ZKT%3C/text%3E%3Crect x='30' y='185' width='260' height='10' rx='5' fill='%232A2B36'/%3E%3Crect x='30' y='185' width='180' height='10' rx='5' fill='%236366F1'/%3E%3Crect x='20' y='200' width='280' height='36' rx='4' fill='%23373A48'/%3E%3Ctext x='40' y='223' font-family='Arial' font-size='14' fill='white'%3ERedeem Rewards%3C/text%3E%3Crect x='20' y='250' width='280' height='150' rx='4' fill='%232A2B36'/%3E%3Crect x='30' y='260' width='80' height='25' rx='12' fill='%23373A48'/%3E%3Ctext x='48' y='277' font-family='Arial' font-size='12' fill='white'%3ERecent Ads%3C/text%3E%3Crect x='120' y='260' width='80' height='25' rx='12' fill='%236366F1'/%3E%3Ctext x='138' y='277' font-family='Arial' font-size='12' fill='white'%3EEarnings%3C/text%3E%3Cline x1='40' y1='305' x2='280' y2='305' stroke='%23373A48' stroke-width='1'/%3E%3Ctext x='40' y='325' font-family='Arial' font-size='12' fill='white'%3EWeb3 Platform Ad%3C/text%3E%3Ctext x='40' y='345' font-family='Arial' font-size='10' fill='%23999'%3E1 hour ago · 2.5 ZKT earned%3C/text%3E%3Cline x1='40' y1='365' x2='280' y2='365' stroke='%23373A48' stroke-width='1'/%3E%3Ctext x='40' y='385' font-family='Arial' font-size='12' fill='white'%3ENFT Marketplace Ad%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learn More Arrow */}
          <div className="flex justify-center mt-12">
            <a href="#features" className="flex flex-col items-center text-slate-400 hover:text-white transition-colors">
              <span className="text-xs mb-2">Learn More</span>
              <ChevronRight className="h-5 w-5 rotate-90 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-lg mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 mb-4">
              Sovereign Adseign Ads Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Privacy & Rewards Combined
            </h2>
            <p className="text-slate-300">
              Our platform combines zero-knowledge technology with rewards to create a win-win for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-slate-900/50 border border-slate-800 rounded-xl p-6 transition-all hover:border-blue-500/20 hover:-translate-y-1 hover:shadow-md hover:shadow-blue-900/10">
              <div className="mb-4 bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Zero-Knowledge Proofs</h3>
              <p className="text-slate-300">Your data never leaves your device. We verify engagement without accessing personal information.</p>
            </div>

            <div className="feature-card bg-slate-900/50 border border-slate-800 rounded-xl p-6 transition-all hover:border-purple-500/20 hover:-translate-y-1 hover:shadow-md hover:shadow-purple-900/10">
              <div className="mb-4 bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-purple-400">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Token Rewards</h3>
              <p className="text-slate-300">Earn ZKT tokens for every ad you view. Cash out or use them across our ecosystem.</p>
            </div>

            <div className="feature-card bg-slate-900/50 border border-slate-800 rounded-xl p-6 transition-all hover:border-indigo-500/20 hover:-translate-y-1 hover:shadow-md hover:shadow-indigo-900/10">
              <div className="mb-4 bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-400">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Decentralized Ads</h3>
              <p className="text-slate-300">Our marketplace connects advertisers directly with users, removing the need for intrusive middlemen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-20 bg-slate-950 relative">
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-lg mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-slate-300">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: <MousePointer className="h-6 w-6" />, 
                title: "Connect Wallet", 
                desc: "Link your Web3 wallet to start" 
              },
              { 
                icon: <Eye className="h-6 w-6" />, 
                title: "View Ads", 
                desc: "See relevant ads while browsing" 
              },
              { 
                icon: <ShieldCheck className="h-6 w-6" />, 
                title: "Privacy Preserved", 
                desc: "Your data never leaves your device" 
              },
              { 
                icon: <Gift className="h-6 w-6" />, 
                title: "Earn Rewards", 
                desc: "Get ZKT tokens automatically" 
              }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
                  <div className="mb-4 flex justify-between items-center">
                    <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-400">
                      {step.icon}
                    </div>
                    <span className="text-3xl font-bold text-slate-700">{i+1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="h-6 w-6 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900/80 to-purple-900/30"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 sm:p-10">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Choose your path and join the privacy-first advertising revolution
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/user-dashboard" className="flex-1 sm:flex-initial group">
                  <Button className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 transform group-hover:-translate-y-0.5">
                    For Users
                    <Gift className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  </Button>
                </Link>
                
                <Link href="/dashboard" className="flex-1 sm:flex-initial group">
                  <Button className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 transform group-hover:-translate-y-0.5">
                    For Advertisers
                    <MegaphoneIcon className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Sparkles className="h-5 w-5 text-indigo-400 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sovereign Adseign Ads
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Sovereign Adseign Ads. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
