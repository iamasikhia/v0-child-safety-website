"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Tablet, Plus, Settings } from "lucide-react"

export default function NetworkPage() {
  const devices = [
    { id: "1", name: "Emma's Laptop", type: "laptop", profile: "Emma", status: "Active", lastSeen: "Just now" },
    { id: "2", name: "Lucas's iPad", type: "tablet", profile: "Lucas", status: "Active", lastSeen: "5 minutes ago" },
    { id: "3", name: "Emma's Phone", type: "phone", profile: "Emma", status: "Inactive", lastSeen: "2 hours ago" },
  ]

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return Monitor
      case "tablet":
        return Tablet
      case "phone":
        return Smartphone
      default:
        return Monitor
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Network</h1>
          <p className="text-muted-foreground">Manage connected devices</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => {
          const Icon = getDeviceIcon(device.type)
          return (
            <Card key={device.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant={device.status === "Active" ? "default" : "secondary"}>{device.status}</Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{device.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">Profile: {device.profile}</p>
              <p className="text-xs text-muted-foreground mb-4">Last seen: {device.lastSeen}</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
