"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  Activity,
  ShieldAlert,
  Settings,
  Network,
  Filter,
  Globe,
  Database,
  ShieldOff,
  Key,
  Users,
  UserCircle,
  ChevronDown,
  Menu,
  X,
  Baby,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Activity", href: "/dashboard/activity", icon: Activity },
  { name: "Blocked Requests", href: "/dashboard/blocked", icon: ShieldAlert },
  { name: "Child Activity", href: "/dashboard/child-activity", icon: Baby },
  {
    name: "Settings",
    icon: Settings,
    children: [
      { name: "Your Network", href: "/dashboard/settings/network", icon: Network },
      { name: "Categories & Filters", href: "/dashboard/settings/categories", icon: Filter },
      { name: "Custom Domains", href: "/dashboard/settings/domains", icon: Globe },
      { name: "Data Retention", href: "/dashboard/settings/retention", icon: Database },
      { name: "Block Pages", href: "/dashboard/settings/block-pages", icon: ShieldOff },
      { name: "API Access", href: "/dashboard/settings/api", icon: Key },
    ],
  },
  { name: "Profiles", href: "/dashboard/profiles", icon: Users },
  { name: "My Account", href: "/dashboard/account", icon: UserCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 p-6 border-b border-border">
        <Image src="/sacredeyes-logo.jpeg" alt="SacredEyes" width={40} height={40} className="rounded-lg" />
        <span className="font-semibold text-lg">SacredEyes</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-180")} />
                </button>
                {settingsOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === child.href ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-accent",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}
