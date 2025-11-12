"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Monitor } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ChildProfile {
  id: string
  name: string
  age: number
  avatar?: string
  devicesConnected: number
  status: "active" | "offline"
}

export function ChildProfiles() {
  const [profiles] = useState<ChildProfile[]>([
    {
      id: "1",
      name: "Emma",
      age: 12,
      devicesConnected: 2,
      status: "active",
    },
    {
      id: "2",
      name: "Noah",
      age: 9,
      devicesConnected: 1,
      status: "offline",
    },
  ])

  const [selectedProfile, setSelectedProfile] = useState<string>("1")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Child Profiles</h2>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Child
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedProfile === profile.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedProfile(profile.id)}
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{profile.name}</h3>
                  <Badge variant={profile.status === "active" ? "default" : "secondary"} className="text-xs">
                    {profile.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Age {profile.age}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Monitor className="h-3 w-3" />
                  <span>{profile.devicesConnected} device(s)</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Card className="p-4 border-dashed flex items-center justify-center min-h-[100px] cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="text-center">
            <Plus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Add another child</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
