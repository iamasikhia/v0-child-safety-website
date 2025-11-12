"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Plus, Edit, Clock } from "lucide-react"

export default function ProfilesPage() {
  const profiles = [
    { id: "1", name: "Emma", age: "13-15", devices: 2, timeLimit: "2h/day", status: "Active" },
    { id: "2", name: "Lucas", age: "10-12", devices: 1, timeLimit: "1.5h/day", status: "Active" },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profiles</h1>
          <p className="text-muted-foreground">Manage child profiles</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Profile
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {profiles.map((profile) => (
          <Card key={profile.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">Age: {profile.age}</p>
                </div>
              </div>
              <Badge variant="default">{profile.status}</Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Devices linked</span>
                <span className="font-medium text-foreground">{profile.devices}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time limit</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-foreground">{profile.timeLimit}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
