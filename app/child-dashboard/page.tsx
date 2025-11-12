"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, AlertCircle, CheckCircle, ShieldAlert, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ScanResult {
  url: string
  websiteType: string
  safetyScore: number
  description: string
  concerns: string[]
  approved: boolean
}

export default function ChildDashboardPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const supabase = createBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      // Get child user profile
      const { data: childUser } = await supabase.from("child_users").select("username").eq("user_id", user.id).single()

      if (childUser) {
        setUsername(childUser.username)
      }
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/scan-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error("Failed to scan website")

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || "Failed to scan website")
    } finally {
      setLoading(false)
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getSafetyLabel = (score: number) => {
    if (score >= 80) return "Safe"
    if (score >= 60) return "Caution"
    return "Unsafe"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/sacredeyes-logo.jpeg" alt="SacredEyes Logo" width={40} height={40} className="rounded-lg" />
            <div>
              <span className="text-xl font-bold block">SacredEyes</span>
              {username && <span className="text-sm text-muted-foreground">Welcome, {username}!</span>}
            </div>
          </Link>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">Is This Website Safe?</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Enter a website URL and I'll check if it's safe for you to visit
          </p>
        </div>

        {/* URL Input Form */}
        <Card className="p-8 mb-8">
          <form onSubmit={handleScan} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 text-base"
                />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="px-8">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Check Website
                  </>
                )}
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-4 bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </Card>

        {/* Results */}
        {result && (
          <Card className="p-8">
            <div className="space-y-6">
              {/* Safety Score Header */}
              <div className="text-center pb-6 border-b">
                <div className={`text-6xl font-bold mb-2 ${getSafetyColor(result.safetyScore)}`}>
                  {result.safetyScore}%
                </div>
                <div className="flex items-center justify-center gap-2 text-xl font-semibold">
                  {result.approved ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <ShieldAlert className="h-6 w-6 text-red-600" />
                  )}
                  <span className={getSafetyColor(result.safetyScore)}>{getSafetyLabel(result.safetyScore)}</span>
                </div>
              </div>

              {/* Website Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Website URL</h3>
                  <p className="text-base break-all">{result.url}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Website Type</h3>
                  <p className="text-base">{result.websiteType}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Description</h3>
                  <p className="text-base leading-relaxed">{result.description}</p>
                </div>

                {result.concerns.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Safety Concerns</h3>
                    <ul className="space-y-2">
                      {result.concerns.map((concern, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation */}
                <div className={`p-4 rounded-lg ${result.approved ? "bg-green-50" : "bg-red-50"}`}>
                  <h3 className="text-sm font-semibold mb-1">Recommendation</h3>
                  <p className="text-sm">
                    {result.approved
                      ? "This website appears to be safe for you to visit. Have fun exploring!"
                      : "This website may not be appropriate. Please ask your parent or guardian before visiting."}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
