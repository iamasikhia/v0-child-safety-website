import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("allowed_sites")
      .select("*")
      .eq("parent_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ sites: data || [] })
  } catch (error) {
    console.error("Allowed sites API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { domain, reason } = body

    const { data, error } = await supabase
      .from("allowed_sites")
      .insert({
        parent_id: user.id,
        domain,
        reason: reason || null,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ site: data })
  } catch (error) {
    console.error("Add allowed site error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("id")

    if (!siteId) {
      return NextResponse.json({ error: "Site ID required" }, { status: 400 })
    }

    const { error } = await supabase.from("allowed_sites").delete().eq("id", siteId).eq("parent_id", user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete allowed site error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
