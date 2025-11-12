import { Shield, Eye, Clock, BarChart3, Users, Database } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "DNS-Level Filtering",
    description: "Desktop app with secure DNS filtering blocks unsafe domains automatically before they load.",
  },
  {
    icon: Eye,
    title: "Real-Time Website Scanning",
    description: "AI scans every website for inappropriate keywords, media, and metadata with instant detection.",
  },
  {
    icon: Database,
    title: "Offline Protection",
    description: "Cached database of known unsafe domains ensures protection even without internet connection.",
  },
  {
    icon: Clock,
    title: "Screen Time & Scheduling",
    description: "Set healthy limits and usage schedules synchronized across all child devices.",
  },
  {
    icon: BarChart3,
    title: "Parent Dashboard Sync",
    description: "Monitor blocked sites, activity summaries, and alerts from any device via secure API sync.",
  },
  {
    icon: Users,
    title: "Multi-Child Profiles",
    description: "Create individual profiles per device with customized filtering rules based on age and needs.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-400/15 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl opacity-20" />

        {/* Decorative lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl mb-4 text-balance">
            Complete protection for the digital age
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Everything you need to create a safe and healthy online environment for your children.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
