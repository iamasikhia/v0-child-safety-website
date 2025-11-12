"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Download, Upload } from "lucide-react"
import type { BlockedSite, AllowedSite } from "@/lib/types/database"

export default function DomainsPage() {
  const [whitelistDomains, setWhitelistDomains] = useState<AllowedSite[]>([])
  const [blacklistDomains, setBlacklistDomains] = useState<BlockedSite[]>([])
  const [whitelistInput, setWhitelistInput] = useState("")
  const [blacklistInput, setBlacklistInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const [allowedRes, blockedRes] = await Promise.all([
          fetch("/api/dashboard/allowed-sites"),
          fetch("/api/dashboard/blocked-sites"),
        ])

        if (allowedRes.ok) {
          const data = await allowedRes.json()
          setWhitelistDomains(data.sites || [])
        }

        if (blockedRes.ok) {
          const data = await blockedRes.json()
          setBlacklistDomains(data.sites || [])
        }
      } catch (error) {
        console.error("Failed to fetch domains:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDomains()
  }, [])

  const handleAddWhitelist = async () => {
    if (!whitelistInput.trim()) return

    try {
      const response = await fetch("/api/dashboard/allowed-sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: whitelistInput.trim() }),
      })

      if (response.ok) {
        const data = await response.json()
        setWhitelistDomains([...whitelistDomains, data.site])
        setWhitelistInput("")
      }
    } catch (error) {
      console.error("Failed to add allowed site:", error)
    }
  }

  const handleAddBlacklist = async () => {
    if (!blacklistInput.trim()) return

    try {
      const response = await fetch("/api/dashboard/blocked-sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: blacklistInput.trim() }),
      })

      if (response.ok) {
        const data = await response.json()
        setBlacklistDomains([...blacklistDomains, data.site])
        setBlacklistInput("")
      }
    } catch (error) {
      console.error("Failed to add blocked site:", error)
    }
  }

  const handleDeleteWhitelist = async (id: string) => {
    try {
      const response = await fetch(`/api/dashboard/allowed-sites?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setWhitelistDomains(whitelistDomains.filter((d) => d.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete allowed site:", error)
    }
  }

  const handleDeleteBlacklist = async (id: string) => {
    try {
      const response = await fetch(`/api/dashboard/blocked-sites?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBlacklistDomains(blacklistDomains.filter((d) => d.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete blocked site:", error)
    }
  }
  // </CHANGE>

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Custom Domains</h1>
        <p className="text-muted-foreground">Manage whitelist and blacklist</p>
      </div>

      <Tabs defaultValue="whitelist" className="space-y-6">
        <TabsList>
          <TabsTrigger value="whitelist">Whitelist ({whitelistDomains.length})</TabsTrigger>
          <TabsTrigger value="blacklist">Blacklist ({blacklistDomains.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="whitelist" className="space-y-4">
          <Card className="p-6">
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Enter domain (e.g., example.com)"
                className="flex-1"
                value={whitelistInput}
                onChange={(e) => setWhitelistInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddWhitelist()}
              />
              <Button onClick={handleAddWhitelist}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : whitelistDomains.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No whitelisted domains yet</div>
            ) : (
              <div className="space-y-2">
                {whitelistDomains.map((domain) => (
                  <div
                    key={domain.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <span className="text-sm text-foreground">{domain.domain}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteWhitelist(domain.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="blacklist" className="space-y-4">
          <Card className="p-6">
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Enter domain (e.g., example.com)"
                className="flex-1"
                value={blacklistInput}
                onChange={(e) => setBlacklistInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddBlacklist()}
              />
              <Button onClick={handleAddBlacklist}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : blacklistDomains.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No blacklisted domains yet</div>
            ) : (
              <div className="space-y-2">
                {blacklistDomains.map((domain) => (
                  <div
                    key={domain.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <span className="text-sm text-foreground">{domain.domain}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteBlacklist(domain.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
