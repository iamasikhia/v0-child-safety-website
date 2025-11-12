import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createServerClient } from "@/lib/supabase/server"

// Fallback rule-based scanner
function analyzeContentWithRules(textContent: string, url: string) {
  const lowerContent = textContent.toLowerCase()

  // Unsafe keywords
  const unsafeKeywords = [
    "casino",
    "gambling",
    "bet",
    "adult",
    "porn",
    "xxx",
    "violence",
    "weapon",
    "drug",
    "alcohol",
    "cigarette",
    "dating",
  ]

  // Educational keywords
  const educationalKeywords = [
    "learn",
    "education",
    "school",
    "tutorial",
    "study",
    "homework",
    "math",
    "science",
    "reading",
    "library",
  ]

  // Social media domains
  const socialMediaDomains = ["facebook", "instagram", "twitter", "tiktok", "snapchat", "reddit"]

  // Gaming domains
  const gamingKeywords = ["game", "play", "gaming", "minecraft", "roblox", "fortnite"]

  const concerns: string[] = []
  let safetyScore = 80
  let websiteType = "General"
  let isSafe = true

  // Check for unsafe content
  const unsafeMatches = unsafeKeywords.filter((keyword) => lowerContent.includes(keyword))
  if (unsafeMatches.length > 0) {
    concerns.push(`Contains potentially inappropriate content: ${unsafeMatches.join(", ")}`)
    safetyScore -= unsafeMatches.length * 20
    isSafe = false
  }

  // Determine website type
  if (educationalKeywords.some((keyword) => lowerContent.includes(keyword))) {
    websiteType = "Educational"
    safetyScore += 10
  } else if (socialMediaDomains.some((domain) => url.includes(domain))) {
    websiteType = "Social Media"
    concerns.push("Social media platforms may contain user-generated content")
    safetyScore -= 10
  } else if (gamingKeywords.some((keyword) => lowerContent.includes(keyword))) {
    websiteType = "Gaming"
    safetyScore -= 5
  } else if (lowerContent.includes("news") || lowerContent.includes("article")) {
    websiteType = "News"
  }

  // Clamp safety score
  safetyScore = Math.max(0, Math.min(100, safetyScore))

  return {
    websiteType,
    safetyScore,
    description: `${websiteType} website analyzed using content rules`,
    concerns,
    approved: isSafe && safetyScore >= 60,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("[v0] Scanning website:", url)

    // Fetch website content
    const websiteResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!websiteResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch website" }, { status: 400 })
    }

    const html = await websiteResponse.text()

    // Extract text content (remove HTML tags for cleaner analysis)
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .substring(0, 5000) // Limit to first 5000 characters

    let analysis

    // Try AI analysis first, fall back to rules if it fails
    try {
      console.log("[v0] Attempting AI analysis...")
      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        prompt: `You are a child safety AI assistant. Analyze the following website content and determine if it's safe for children.

Website URL: ${url}
Website Content: ${textContent}

Provide a JSON response with the following structure:
{
  "websiteType": "Brief category (e.g., Educational, Social Media, Gaming, News, etc.)",
  "safetyScore": number between 0-100,
  "description": "Brief description of what the website is about",
  "concerns": ["List of specific safety concerns, if any"],
  "approved": boolean (true if safe for children, false if not)
}

Consider these factors:
- Violent, adult, or inappropriate content
- Gaming or gambling content
- Social media platforms with user-generated content
- Educational and age-appropriate content
- Privacy and security risks
- Misleading or scam content

Be thorough but concise. Return ONLY valid JSON.`,
      })

      analysis = JSON.parse(text.trim())
      console.log("[v0] AI analysis successful")
    } catch (aiError: any) {
      console.log("[v0] AI analysis failed, using rule-based fallback:", aiError.message)
      analysis = analyzeContentWithRules(textContent, url)
    }

    if (user) {
      const domain = new URL(url).hostname
      const { error: insertError } = await supabase.from("website_scans").insert({
        child_user_id: user.id,
        url,
        domain,
        website_type: analysis.websiteType,
        safety_score: analysis.safetyScore,
        description: analysis.description,
        concerns: analysis.concerns,
        is_safe: analysis.approved,
        scanned_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("[v0] Error saving scan:", insertError.message)
      }
    } else {
      console.log("[v0] Anonymous scan - results not saved to database")
    }

    return NextResponse.json({
      url,
      websiteType: analysis.websiteType,
      safetyScore: analysis.safetyScore,
      description: analysis.description,
      concerns: analysis.concerns,
      approved: analysis.approved,
    })
  } catch (error: any) {
    console.error("[v0] Website scan error:", error.message)
    return NextResponse.json({ error: error.message || "Failed to analyze website" }, { status: 500 })
  }
}
