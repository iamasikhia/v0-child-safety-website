import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
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

    // Parse query params
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const category = searchParams.get("category")
    const threat = searchParams.get("threat")

    // Build query
    let query = supabase
      .from("activity_logs")
      .select("*, child_profiles(name)")
      .eq("parent_id", user.id)
      .order("visited_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (threat && threat !== "all") {
      query = query.eq("threat_level", threat)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ activity: data || [] })
  } catch (error) {
    console.error("Activity API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
