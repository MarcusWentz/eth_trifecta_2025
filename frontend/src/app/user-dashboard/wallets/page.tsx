"use client"

import { useState, useEffect } from "react"
import { useAccount, useDisconnect, useBalance } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Wallet, 
  Copy, 
  ArrowUpRight, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Shield,
  Key,
  RefreshCw,
  ChevronRight,
  ArrowRightLeft,
  PlusCircle
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function WalletsPage() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("wallets")
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [transferAmount, setTransferAmount] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")

  // Sample transaction history data
  const transactions = [
    {
      id: "tx1",
      type: "Receive",
      amount: "15.00",
      date: "2023-05-20T14:30:00",
      from: "0x1a2...3b4c",
      to: address?.slice(0, 6) + "..." + address?.slice(-4),
      status: "Confirmed",
      hash: "0x1a2b3c4d5e6f...",
    },
    {
      id: "tx2",
      type: "Send",
      amount: "5.00",
      date: "2023-05-18T10:15:00",
      from: address?.slice(0, 6) + "..." + address?.slice(-4),
      to: "0x5e6...7f8g",
      status: "Confirmed",
      hash: "0x7g8h9i10j11k...",
    },
    {
      id: "tx3",
      type: "Reward",
      amount: "2.50",
      date: "2023-05-15T16:45:00",
      from: "Sovereign Ads",
      to: address?.slice(0, 6) + "..." + address?.slice(-4),
      status: "Confirmed",
      hash: "0x12l13m14n15o...",
    },
    {
      id: "tx4",
      type: "Send",
      amount: "3.25",
      date: "2023-05-10T09:30:00",
      from: address?.slice(0, 6) + "..." + address?.slice(-4),
      to: "0xab1...cd2e",
      status: "Confirmed",
      hash: "0x16p17q18r19s...",
    },
    {
      id: "tx5",
      type: "Reward",
      amount: "1.75",
      date: "2023-05-05T11:20:00",
      from: "Sovereign Ads",
      to: address?.slice(0, 6) + "..." + address?.slice(-4),
      status: "Confirmed",
      hash: "0x20t21u22v23w...",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatWalletAddress = (addr: string | undefined) => {
    if (!addr) return ""
    return addr.slice(0, 6) + "..." + addr.slice(-4)
  }

  const copyToClipboard = (text: string | undefined) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getTransactionStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return (
          <Badge
            variant="success"
            className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          >
            Confirmed
          </Badge>
        )
      case "Pending":
        return (
          <Badge
            variant="warning"
            className="bg-amber-500/10 text-amber-500 border-amber-500/20"
          >
            Pending
          </Badge>
        )
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case "Receive":
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-emerald-500 transform rotate-90" />
          </div>
        )
      case "Send":
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-indigo-500" />
          </div>
        )
      case "Reward":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-purple-500" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-slate-500" />
          </div>
        )
    }
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Wallet Management</h1>
        <p className="text-muted-foreground">
          Manage your wallets and track your ZKT tokens
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-slate-800 h-full">
            <CardHeader>
              <CardTitle>Connected Wallet</CardTitle>
              <CardDescription>
                {isConnected ? "Your connected wallet details" : "Connect your wallet to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isConnected ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600">
                        <AvatarFallback>
                          {address ? address.slice(0, 2) : "WA"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm text-slate-400">Primary Wallet</div>
                        <div className="flex items-center">
                          <span className="text-lg font-medium">
                            {formatWalletAddress(address)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(address)}
                            className="ml-2 text-slate-400 hover:text-slate-300 transition"
                          >
                            {copySuccess ? (
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-slate-700 hover:bg-slate-800"
                      onClick={() => disconnect()}
                    >
                      Disconnect
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-950/60 border-slate-800">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400">ZKT Balance</span>
                          <Badge
                            variant="outline"
                            className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          >
                            ZKT
                          </Badge>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold">42.75</span>
                          <span className="text-xs ml-2 text-slate-400">≈ $21.38 USD</span>
                        </div>
                        <div className="mt-4 flex">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-700 bg-slate-800/50 mr-2 flex-1"
                            onClick={() => setIsTransferDialogOpen(true)}
                          >
                            <ArrowRightLeft className="h-4 w-4 mr-2" /> Transfer
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex-1"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" /> Buy ZKT
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-950/60 border-slate-800">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400">Earning Rate</span>
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          >
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold">0.65</span>
                          <span className="text-xs ml-2 text-slate-400">ZKT per ad view</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-400">Level Progress</span>
                            <span className="text-xs text-slate-300">
                              2,150 / 3,000 XP
                            </span>
                          </div>
                          <Progress value={72} className="h-2 bg-slate-800" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <Wallet className="h-12 w-12 mb-4 text-slate-400" />
                  <h3 className="text-lg font-medium mb-2">No Wallet Connected</h3>
                  <p className="text-slate-400 text-sm text-center mb-6 max-w-md">
                    Connect your wallet to track your ZKT tokens, view transaction
                    history and manage your wallet settings.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <ConnectButton />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-slate-900/50 border-slate-800 h-full">
            <CardHeader>
              <CardTitle>Security Status</CardTitle>
              <CardDescription>
                Wallet security recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <Shield className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-400">
                      Enhance your account security with 2FA.
                    </p>
                    <Button size="sm" variant="link" className="px-0 text-indigo-400 h-auto">
                      Enable 2FA <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <Key className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Backup Your Wallet</h4>
                    <p className="text-sm text-slate-400">
                      Ensure you've backed up your recovery phrase.
                    </p>
                    <Button size="sm" variant="link" className="px-0 text-indigo-400 h-auto">
                      Learn how <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-slate-400" />
                    Security Level
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Basic</span>
                      <span className="text-sm text-amber-500">Medium</span>
                      <span className="text-sm">Advanced</span>
                    </div>
                    <Progress value={50} className="h-2 bg-slate-800" />
                    <p className="text-xs text-slate-400 mt-2">
                      Enable 2FA and complete a backup to increase your security level.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="transactions" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-indigo-600"
          >
            Transaction History
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-indigo-600"
          >
            Wallet Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-0">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {isConnected ? (
                <div className="rounded-md border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="hover:bg-slate-800/70 border-slate-700">
                        <TableHead className="font-medium text-slate-400">Type</TableHead>
                        <TableHead className="font-medium text-slate-400">Date</TableHead>
                        <TableHead className="font-medium text-slate-400">Details</TableHead>
                        <TableHead className="font-medium text-slate-400">Amount</TableHead>
                        <TableHead className="font-medium text-slate-400">Status</TableHead>
                        <TableHead className="font-medium text-slate-400 text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id} className="hover:bg-slate-800/30 border-slate-800">
                          <TableCell>
                            <div className="flex items-center">
                              {getTransactionTypeIcon(tx.type)}
                              <span className="ml-3 font-medium">{tx.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(tx.date)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>
                                <span className="text-slate-400">From: </span>
                                <span>{tx.from}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">To: </span>
                                <span>{tx.to}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className={`font-semibold ${
                            tx.type === "Receive" || tx.type === "Reward" 
                              ? "text-emerald-400" 
                              : "text-indigo-400"
                          }`}>
                            {tx.type === "Receive" || tx.type === "Reward" ? "+" : "-"}
                            {tx.amount} ZKT
                          </TableCell>
                          <TableCell>
                            {getTransactionStatusBadge(tx.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-400">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-slate-400">
                    Connect your wallet to view your transaction history
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Wallet Settings</CardTitle>
              <CardDescription>
                Configure how your wallet integrates with Sovereign Ads
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isConnected ? (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Auto-redeem Options</h3>
                    <p className="text-sm text-slate-400">
                      Configure how and when your earned ZKT tokens are redeemed
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <RefreshCw className="h-5 w-5 text-indigo-400" />
                        <div>
                          <h4 className="font-medium">Automatic Rewards Claiming</h4>
                          <p className="text-sm text-slate-400">
                            Automatically claim rewards when they reach a threshold
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-4 border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                          Active
                        </Badge>
                        <Button size="sm" variant="outline" className="border-slate-700 bg-slate-800/70">
                          Configure
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-slate-400" />
                        <div>
                          <h4 className="font-medium">Spending Limit</h4>
                          <p className="text-sm text-slate-400">
                            Set a daily spending limit for your wallet
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-4 border-slate-500/20 bg-slate-500/10 text-slate-400">
                          Not Set
                        </Badge>
                        <Button size="sm" variant="outline" className="border-slate-700 bg-slate-800/70">
                          Set Limit
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <Key className="h-5 w-5 text-slate-400" />
                        <div>
                          <h4 className="font-medium">Authorized Applications</h4>
                          <p className="text-sm text-slate-400">
                            Manage applications that can access your wallet
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-4 border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                          1 Active
                        </Badge>
                        <Button size="sm" variant="outline" className="border-slate-700 bg-slate-800/70">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-slate-400">
                    Connect your wallet to access wallet settings
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transfer ZKT Tokens</DialogTitle>
            <DialogDescription>
              Send ZKT tokens to another wallet address
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipient Address</label>
              <Input
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="bg-slate-950/50 border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="pr-16 bg-slate-950/50 border-slate-800"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-sm font-medium text-slate-400">ZKT</span>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Balance: 42.75 ZKT</span>
                <Button
                  variant="link"
                  className="h-auto p-0 text-indigo-400"
                  onClick={() => setTransferAmount("42.75")}
                >
                  Max
                </Button>
              </div>
            </div>
            <div className="bg-slate-800/40 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Network Fee</span>
                <span>~0.001 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Time</span>
                <span>~2 min</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTransferDialogOpen(false)}
              className="border-slate-700"
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              disabled={!transferAmount || !recipientAddress}
            >
              Transfer Tokens
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 