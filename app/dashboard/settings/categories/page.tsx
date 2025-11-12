"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export default function CategoriesPage() {
  const [strictMode, setStrictMode] = useState(false)

  const categories = [
    { id: "adult", name: "Adult Content", enabled: true, description: "Blocks pornography and mature content" },
    { id: "violence", name: "Violence", enabled: true, description: "Blocks violent and graphic content" },
    { id: "gambling", name: "Gambling", enabled: true, description: "Blocks gambling and betting sites" },
    { id: "games", name: "Games", enabled: false, description: "Blocks gaming websites and platforms" },
    { id: "social", name: "Social Media", enabled: false, description: "Blocks social networking sites" },
    { id: "chat", name: "Chat & Messaging", enabled: true, description: "Blocks chat apps and messaging platforms" },
    { id: "drugs", name: "Drugs & Alcohol", enabled: true, description: "Blocks content related to drugs and alcohol" },
    { id: "weapons", name: "Weapons", enabled: true, description: "Blocks content about weapons and explosives" },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Categories & Filters</h1>
        <p className="text-muted-foreground">Control what content is blocked</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="strict-mode" className="text-base font-semibold">
                Strict Mode
              </Label>
              <p className="text-sm text-muted-foreground">Maximum protection with highest sensitivity</p>
            </div>
          </div>
          <Switch id="strict-mode" checked={strictMode} onCheckedChange={setStrictMode} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between py-4 border-b border-border last:border-0"
            >
              <div className="flex-1">
                <Label htmlFor={category.id} className="text-base font-medium">
                  {category.name}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              </div>
              <Switch id={category.id} defaultChecked={category.enabled} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
