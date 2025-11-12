"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, X, CheckCircle2, XCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WhitelistBlacklist() {
  const [whitelistDomains] = useState(["khanacademy.org", "nationalgeographic.com", "sciencedaily.com"])
  const [blacklistDomains] = useState(["example-blocked.com", "gambling-site.com"])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Website Management</h2>

      <Tabs defaultValue="whitelist" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="whitelist">Whitelist</TabsTrigger>
          <TabsTrigger value="blacklist">Blacklist</TabsTrigger>
        </TabsList>

        <TabsContent value="whitelist" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Add domain to whitelist (e.g., example.com)" className="flex-1" />
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Whitelisted Domains ({whitelistDomains.length})</p>
                <div className="flex flex-wrap gap-2">
                  {whitelistDomains.map((domain) => (
                    <Badge key={domain} variant="outline" className="gap-2 py-2 px-3">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                      {domain}
                      <button className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Whitelisted sites are always accessible, even if they match blocked categories.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="blacklist" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Add domain to blacklist (e.g., example.com)" className="flex-1" />
                <Button variant="destructive" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Block
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Blacklisted Domains ({blacklistDomains.length})</p>
                <div className="flex flex-wrap gap-2">
                  {blacklistDomains.map((domain) => (
                    <Badge key={domain} variant="destructive" className="gap-2 py-2 px-3">
                      <XCircle className="h-3 w-3" />
                      {domain}
                      <button className="ml-1 hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Blacklisted sites are always blocked, regardless of their category or rating.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
