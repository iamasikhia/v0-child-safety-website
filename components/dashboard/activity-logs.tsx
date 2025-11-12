"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Shield, AlertTriangle } from "lucide-react"

interface Activity {
  id: string
  website: string
  timestamp: string
  rating: "safe" | "warning" | "blocked"
  category: string
}

export function ActivityLogs() {
  const activities: Activity[] = [
    {
      id: "1",
      website: "youtube.com",
      timestamp: "2 minutes ago",
      rating: "safe",
      category: "Entertainment",
    },
    {
      id: "2",
      website: "khanacademy.org",
      timestamp: "15 minutes ago",
      rating: "safe",
      category: "Education",
    },
    {
      id: "3",
      website: "blocked-site.com",
      timestamp: "1 hour ago",
      rating: "blocked",
      category: "Adult Content",
    },
    {
      id: "4",
      website: "gaming-site.com",
      timestamp: "2 hours ago",
      rating: "warning",
      category: "Games",
    },
  ]

  const getRatingIcon = (rating: Activity["rating"]) => {
    switch (rating) {
      case "safe":
        return <Shield className="h-4 w-4 text-primary" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      case "blocked":
        return <Shield className="h-4 w-4 text-destructive" />
    }
  }

  const getRatingBadge = (rating: Activity["rating"]) => {
    const variants = {
      safe: "default",
      warning: "secondary",
      blocked: "destructive",
    } as const

    return (
      <Badge variant={variants[rating]} className="capitalize">
        {rating}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4 flex-1">
                <div>{getRatingIcon(activity.rating)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">{activity.website}</p>
                    <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{activity.category}</p>
                  </div>
                </div>
              </div>
              {getRatingBadge(activity.rating)}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
