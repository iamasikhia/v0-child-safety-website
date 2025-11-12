"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, ShieldAlert, Clock, User } from "lucide-react"
import { format } from "date-fns"

interface WebsiteScan {
  id: string
  url: string
  domain: string
  website_type: string
  safety_score: number
  description: string
  concerns: string[]
  is_safe: boolean
  scanned_at: string
}

interface Child {
  id: string
  username: string
  age: number
  scans: WebsiteScan[]
}

export default function ChildActivityPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [totalScans, setTotalScans] = useState(0)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch("/api/child-activity")
        if (!response.ok) throw new Error("Failed to fetch activity")

        const data = await response.json()
        setChildren(data.children || [])
        setTotalScans(data.totalScans || 0)
      } catch (error) {
        console.error("[v0] Error fetching child activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const getSafetyIcon = (isApproved: boolean) => {
    return isApproved ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <ShieldAlert className="h-5 w-5 text-red-600" />
    )
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Child Activity Monitor</h1>
        <p className="text-muted-foreground">View your children's website scanning activity and safety scores</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Children</p>
              <p className="text-2xl font-bold">{children.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Scans</p>
              <p className="text-2xl font-bold">{totalScans}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Safe Sites</p>
              <p className="text-2xl font-bold">
                {children.reduce((acc, child) => acc + child.scans.filter((s) => s.is_safe).length, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Children Activity */}
      {children.length === 0 ? (
        <Card className="p-12 text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Children Linked</h3>
          <p className="text-muted-foreground">
            No child accounts are linked to your parent account yet. Children can sign up and link their account using
            their unique parent ID.
          </p>
        </Card>
      ) : (
        <div className="space-y-8">
          {children.map((child) => (
            <Card key={child.id} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{child.username}</h3>
                    <p className="text-sm text-muted-foreground">Age {child.age}</p>
                  </div>
                </div>
                <Badge variant="outline">{child.scans.length} scans</Badge>
              </div>

              {child.scans.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No website scans yet</p>
              ) : (
                <div className="space-y-3">
                  {child.scans.map((scan) => (
                    <div key={scan.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3 flex-1">
                          {getSafetyIcon(scan.is_safe)}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{scan.domain}</p>
                            <p className="text-sm text-muted-foreground truncate">{scan.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSafetyColor(scan.safety_score)} variant="outline">
                            {scan.safety_score}% Safe
                          </Badge>
                          <Badge variant="secondary">{scan.website_type}</Badge>
                        </div>
                      </div>

                      <p className="text-sm mb-2">{scan.description}</p>

                      {scan.concerns && scan.concerns.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Concerns:</strong> {scan.concerns.join(", ")}
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground mt-2">
                        Scanned {format(new Date(scan.scanned_at), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
