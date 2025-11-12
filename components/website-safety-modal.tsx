"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, ShieldAlert, ShieldCheck, Loader2, AlertCircle } from "lucide-react"

interface ScanResult {
  url: string
  type: string
  safetyScore: number
  description: string
  concerns: string[]
}

export function WebsiteSafetyModal() {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState("")

  const handleScan = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/scan-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to scan website")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Unable to scan website. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getSafetyLabel = (score: number) => {
    if (score >= 70) return "Safe"
    if (score >= 40) return "Caution"
    return "Unsafe"
  }

  return (
    <>
      <Button size="lg" variant="outline" className="gap-2 text-base px-8 bg-transparent" onClick={() => setOpen(true)}>
        <Search className="h-5 w-5" />
        Check Website Safety
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Is This Website Safe?</DialogTitle>
            <DialogDescription>Enter a website URL and I'll check if it's safe for you to visit</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Input Section */}
            <div className="flex gap-3">
              <Input
                placeholder="https://www.example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="flex-1"
              />
              <Button onClick={handleScan} disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Check Website
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 text-sm">{error}</div>
            )}

            {/* Results Section */}
            {result && (
              <div className="space-y-4 rounded-lg border bg-card p-6">
                {/* Safety Score */}
                <div className="text-center pb-4 border-b">
                  <div className={`text-6xl font-bold mb-2 ${getSafetyColor(result.safetyScore)}`}>
                    {result.safetyScore}%
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {result.safetyScore >= 70 ? (
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                    ) : (
                      <ShieldAlert className="h-5 w-5 text-red-600" />
                    )}
                    <span className={`text-lg font-semibold ${getSafetyColor(result.safetyScore)}`}>
                      {getSafetyLabel(result.safetyScore)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-muted-foreground mb-1">Website URL</div>
                    <div className="text-foreground break-all">{result.url}</div>
                  </div>

                  <div>
                    <div className="font-semibold text-muted-foreground mb-1">Website Type</div>
                    <div className="text-foreground">{result.type}</div>
                  </div>

                  <div>
                    <div className="font-semibold text-muted-foreground mb-1">Description</div>
                    <div className="text-foreground">{result.description}</div>
                  </div>

                  {result.concerns.length > 0 && (
                    <div>
                      <div className="font-semibold text-muted-foreground mb-2">Safety Concerns</div>
                      <div className="flex items-start gap-2 text-orange-700">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{result.concerns.join(", ")}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendation */}
                {result.safetyScore < 70 && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4 mt-4">
                    <div className="font-semibold text-red-900 mb-1">Recommendation</div>
                    <div className="text-sm text-red-800">
                      This website may not be appropriate. Please ask your parent or guardian before visiting.
                    </div>
                  </div>
                )}

                {result.safetyScore >= 70 && (
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4 mt-4">
                    <div className="font-semibold text-green-900 mb-1">Recommendation</div>
                    <div className="text-sm text-green-800">
                      This website appears to be safe for browsing. Enjoy your visit!
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
