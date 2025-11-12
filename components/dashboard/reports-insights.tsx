"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar, TrendingUp, AlertCircle } from "lucide-react"

export function ReportsInsights() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Reports & Insights</h2>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Weekly Summary</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Review this week's browsing activity, screen time, and protection events.
              </p>
              <Button size="sm" variant="outline">
                View Weekly Report
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Monthly Insights</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive monthly analysis with trends and recommendations.
              </p>
              <Button size="sm" variant="outline">
                View Monthly Report
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">New Safety Insights Available</h3>
            <p className="text-sm text-muted-foreground mb-3">
              We've detected an increase in gaming site visits during homework hours. Consider adjusting schedules or
              creating custom time-based rules.
            </p>
            <Button size="sm" variant="outline">
              Review Recommendations
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
