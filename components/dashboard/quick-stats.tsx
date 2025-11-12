"use client"

import { Card } from "@/components/ui/card"
import { Shield, Ban, Clock, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface Stats {
  sitesVisited: number
  sitesBlocked: number
  activeDevices: number
  protectionStatus: string
}

export function QuickStats() {
  const [stats, setStats] = useState<Stats>({
    sitesVisited: 0,
    sitesBlocked: 0,
    activeDevices: 0,
    protectionStatus: "Loading...",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])
  // </CHANGE>

  const statCards = [
    {
      label: "Sites Visited Today",
      value: isLoading ? "..." : stats.sitesVisited.toString(),
      change: "+12% from yesterday",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Sites Blocked",
      value: isLoading ? "..." : stats.sitesBlocked.toString(),
      change: "3 less than yesterday",
      icon: Ban,
      color: "text-destructive bg-red-50 dark:bg-red-950",
    },
    {
      label: "Active Devices",
      value: isLoading ? "..." : stats.activeDevices.toString(),
      change: `${stats.activeDevices} device${stats.activeDevices !== 1 ? "s" : ""} online`,
      icon: Clock,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950",
    },
    {
      label: "Protection Status",
      value: stats.protectionStatus,
      change: stats.activeDevices > 0 ? "All devices protected" : "No devices active",
      icon: Shield,
      color: "text-primary bg-primary/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
