"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

export function ChildLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Starting child login...")
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log("[v0] Login successful, checking user type...")
      console.log("[v0] User metadata:", data.user.user_metadata)

      const userType = data.user.user_metadata?.user_type

      // Check if user exists in child_users table
      const { data: childUser, error: childError } = await supabase
        .from("child_users")
        .select("*")
        .eq("user_id", data.user.id)
        .maybeSingle()

      console.log("[v0] Child user check:", { childUser, childError })

      // User is a child if they have user_type === "child" OR they exist in child_users table
      if (userType === "child" || childUser) {
        console.log("[v0] Child account verified, redirecting...")
        router.push("/child-dashboard")
      } else {
        // Check if they're a parent by checking parent_profiles
        const { data: parentProfile } = await supabase
          .from("parent_profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .maybeSingle()

        if (parentProfile) {
          console.log("[v0] This is a parent account")
          setError("This account is not a child account. Please use Parent Login.")
        } else {
          // Neither child nor parent - might be an orphaned account
          console.log("[v0] Account type unknown")
          setError("Account verification failed. Please contact support.")
        }
      }
    } catch (error: any) {
      console.error("[v0] Login error:", error)
      setError(error.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  )
}
