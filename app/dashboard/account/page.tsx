"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Trash2 } from "lucide-react"

export default function AccountPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Account</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Smith" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.smith@example.com" />
          </div>
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" placeholder="Leave blank to keep current" />
          </div>
        </div>
        <Button className="mt-6">Save Changes</Button>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Security</h3>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="2fa">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
          </div>
          <Switch id="2fa" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Subscription</h3>
          <Badge>Family Plan</Badge>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium text-foreground">$19.99/month</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next billing date</span>
            <span className="font-medium text-foreground">Dec 15, 2025</span>
          </div>
        </div>
        <Button variant="outline">
          <CreditCard className="h-4 w-4 mr-2" />
          Manage Billing
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Data & Privacy</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export All Data (GDPR)
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}
