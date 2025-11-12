import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get today's activity count
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count: sitesVisited } = await supabase
      .from("activity_logs")
      .select("*", { count: "exact", head: true })
      .eq("parent_id", user.id)
      .gte("visited_at", today.toISOString())

    // Get today's blocked count
    const { count: sitesBlocked } = await supabase
      .from("activity_logs")
      .select("*", { count: "exact", head: true })
      .eq("parent_id", user.id)
      .eq("is_blocked", true)
      .gte("visited_at", today.toISOString())

    // Get total child profiles
    const { data: profiles } = await supabase.from("child_profiles").select("*").eq("parent_id", user.id)

    const activeDevices = profiles?.filter((p) => p.is_active).length || 0

    return NextResponse.json({
      sitesVisited: sitesVisited || 0,
      sitesBlocked: sitesBlocked || 0,
      activeDevices,
      protectionStatus: activeDevices > 0 ? "Active" : "Inactive",
    })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
