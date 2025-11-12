import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }
  // </CHANGE>

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your family's online activity</p>
        </div>
        <QuickStats />
        <DashboardOverview />
      </main>
    </div>
  )
}
