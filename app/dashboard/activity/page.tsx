"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Download, Search } from "lucide-react"
import type { ActivityLog } from "@/lib/types/database"

export default function ActivityPage() {
  const [dateFilter, setDateFilter] = useState("today")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const params = new URLSearchParams({
          limit: "50",
          offset: "0",
        })

        if (categoryFilter !== "all") {
          params.set("category", categoryFilter)
        }

        const response = await fetch(`/api/dashboard/activity?${params}`)
        if (response.ok) {
          const data = await response.json()
          setActivities(data.activity || [])
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [categoryFilter])
  // </CHANGE>

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity</h1>
        <p className="text-muted-foreground">Complete timeline of browsing history</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search websites..." className="pl-10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="lg:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Social Media">Social Media</SelectItem>
              <SelectItem value="Gaming">Gaming</SelectItem>
              <SelectItem value="Adult">Adult</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="lg:w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No activities found</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">URL</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Threat Level</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground truncate max-w-xs">{activity.domain}</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">{activity.category || "Uncategorized"}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          activity.threat_level === "critical" || activity.threat_level === "high"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {activity.threat_level || "unknown"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={activity.is_blocked ? "destructive" : "default"}>
                        {activity.is_blocked ? "Blocked" : "Allowed"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">{formatTime(activity.visited_at)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  )
}
