export interface Profile {
  id: string
  full_name: string | null
  email: string
  subscription_tier: "free" | "basic" | "premium"
  created_at: string
  updated_at: string
}

export interface ChildProfile {
  id: string
  parent_id: string
  name: string
  age: number | null
  device_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  child_profile_id: string
  parent_id: string
  url: string
  domain: string
  title: string | null
  category: string | null
  threat_level: "safe" | "low" | "medium" | "high" | "critical" | null
  is_blocked: boolean
  visited_at: string
  created_at: string
  child_profiles?: {
    name: string
  }
}

export interface BlockedSite {
  id: string
  parent_id: string
  domain: string
  reason: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AllowedSite {
  id: string
  parent_id: string
  domain: string
  reason: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}
