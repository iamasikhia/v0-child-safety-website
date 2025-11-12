"use client"

import { Card } from "@/components/ui/card"
import { Shield, Clock, Ban, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      label: "Websites Accessed Today",
      value: "47",
      change: "+12%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "Websites Blocked",
      value: "8",
      change: "-3 from yesterday",
      icon: Ban,
      color: "text-destructive",
    },
    {
      label: "Screen Time Today",
      value: "3h 24m",
      change: "+18m from average",
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Protection Status",
      value: "Active",
      change: "All devices protected",
      icon: Shield,
      color: "text-primary",
    },
  ]

  return (
    <div className="mt-6">
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Category Breakdown</h3>
        <div className="space-y-4">
          {[
            { name: "Education", percentage: 45, color: "bg-primary" },
            { name: "Entertainment", percentage: 25, color: "bg-blue-500" },
            { name: "Social Media", percentage: 15, color: "bg-purple-500" },
            { name: "Games", percentage: 10, color: "bg-amber-500" },
            { name: "Other", percentage: 5, color: "bg-gray-500" },
          ].map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">{category.name}</span>
                <span className="text-sm font-medium text-foreground">{category.percentage}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
