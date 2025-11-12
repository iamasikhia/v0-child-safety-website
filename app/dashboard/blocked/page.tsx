"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, Unlock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function BlockedPage() {
  const blockedRequests = [
    { id: "1", url: "adult-content.com", reason: "Adult Content Keywords", timestamp: "1:15 PM", profile: "Emma" },
    { id: "2", url: "gambling-site.com", reason: "Gambling Category", timestamp: "10:45 AM", profile: "Lucas" },
    { id: "3", url: "violent-game.com", reason: "Violence Category", timestamp: "10:20 AM", profile: "Lucas" },
    { id: "4", url: "suspicious-download.com", reason: "Malware Warning", timestamp: "9:30 AM", profile: "Emma" },
  ]

  const chartData = [
    { day: "Mon", blocked: 4 },
    { day: "Tue", blocked: 7 },
    { day: "Wed", blocked: 5 },
    { day: "Thu", blocked: 8 },
    { day: "Fri", blocked: 6 },
    { day: "Sat", blocked: 10 },
    { day: "Sun", blocked: 8 },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Blocked Requests</h1>
        <p className="text-muted-foreground">Sites blocked by protection filters</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Blocked Requests Per Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="blocked" stroke="hsl(var(--destructive))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          {blockedRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between py-4 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{request.url}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {request.reason}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{request.profile}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{request.timestamp}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Unlock className="h-4 w-4 mr-2" />
                Unblock
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
