import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all children linked to this parent
    const { data: children, error: childrenError } = await supabase
      .from("child_users")
      .select("id, username, age, created_at")
      .eq("parent_id", user.id)
      .order("created_at", { ascending: false })

    if (childrenError) {
      console.error("[v0] Error fetching children:", childrenError)
      return NextResponse.json({ error: "Failed to fetch children" }, { status: 500 })
    }

    // Get all website scans for these children
    const childIds = children?.map((child) => child.id) || []

    if (childIds.length === 0) {
      return NextResponse.json({ children: [], scans: [] })
    }

    const { data: scans, error: scansError } = await supabase
      .from("website_scans")
      .select("*")
      .in("child_user_id", childIds)
      .order("scanned_at", { ascending: false })
      .limit(100)

    if (scansError) {
      console.error("[v0] Error fetching scans:", scansError)
      return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 })
    }

    // Combine data
    const childrenWithScans = children?.map((child) => ({
      ...child,
      scans: scans?.filter((scan) => scan.child_user_id === child.id) || [],
    }))

    return NextResponse.json({
      children: childrenWithScans,
      totalScans: scans?.length || 0,
    })
  } catch (error: any) {
    console.error("[v0] Child activity error:", error)
    return NextResponse.json({ error: "Failed to fetch child activity" }, { status: 500 })
  }
}
