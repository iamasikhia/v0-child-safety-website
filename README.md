# SacredEyes - Child Safety Website - A McClosekey Project

*Built with [v0.app](https://v0.app) by Vercel*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/iseoluwapauls-projects/v0-child-safety-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/hvBEF2p2aHr)

## Project Overview

**SacredEyes** is an AI-powered child safety platform designed to protect children from harmful online content. The platform empowers parents to monitor their children's internet activity and provides real-time website safety analysis to ensure a safer digital experience for young users.

### Purpose

With the increasing exposure of children to the internet, parents face significant challenges in ensuring their kids access age-appropriate content. SacredEyes addresses this by providing:

- **Real-time website safety scanning** using AI
- **Parent monitoring dashboards** to track children's online activity
- **Intelligent chatbot guidance** for parents on digital safety best practices
- **Multi-device support** across Windows, macOS, Android, and iOS

### Current Status & Future Vision

**Current Implementation (MVP):**
- Users can manually test if a website is safe by entering the URL
- AI analyzes the website content and provides safety scores and recommendations
- Parents can view their children's scanning history
- Available as a web application

**Future Implementation:**
- Desktop and mobile apps installed on children's devices
- Automatic real-time scanning before any website loads
- Device-level protection with instant blocking of unsafe content
- Background monitoring with parental notifications

---

## Technology Stack

- **Frontend:** Next.js 16, React 19.2, TypeScript, Tailwind CSS v4
- **Backend:** Next.js API Routes, Server Actions
- **Database:** Supabase (PostgreSQL with Row Level Security)
- **AI/ML:** Vercel AI SDK v5, OpenAI GPT-5 (via AI Gateway)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel
- **Development:** Built entirely using v0.app by Vercel

---

## AI Components

### 1. AI Website Safety Scanner

**What it does:**

The AI Website Safety Scanner analyzes websites to determine if they are appropriate for children.

**Input:**
- Website URL (e.g., `https://www.example.com`)
- Optional: Child's age (for age-appropriate filtering)

**Output:**
- Safety Score (0-100%)
- Website Type (Educational, Entertainment, Social Media, Gaming, etc.)
- Safety Status (Safe, Caution, Unsafe)
- Specific Concerns (violence, adult content, gambling, inappropriate language, etc.)
- Detailed Recommendation for parents and children

**How it works:**
1. Fetches the target website's HTML content
2. Extracts text content and metadata
3. Sends content to OpenAI GPT-5 with specialized child safety prompts
4. AI analyzes content for inappropriate material, violence, adult themes, gambling, etc.
5. Falls back to rule-based URL analysis if content cannot be fetched
6. Returns structured safety assessment with actionable recommendations

**Example:**
\`\`\`typescript
// Input
POST /api/scan-website
{
  "url": "https://www.youtube.com"
}

// Output
{
  "safetyScore": 65,
  "isChildSafe": false,
  "websiteType": "Entertainment",
  "description": "Video sharing platform with mixed content",
  "concerns": [
    "May contain age-inappropriate videos",
    "User-generated content requires supervision"
  ],
  "recommendation": "Monitor your child's viewing activity and enable restricted mode."
}
\`\`\`

**Why AI was chosen:**

1. **Scale & Adaptability:** The internet has billions of websites, making manual categorization impossible. AI can analyze any website in real-time, even brand-new ones.

2. **Contextual Understanding:** AI understands context beyond simple keyword matching. It can identify subtle risks like predatory language, emotional manipulation, or hidden adult themes that rule-based systems would miss.

3. **Continuous Learning:** As online threats evolve (new social media trends, emerging platforms, sophisticated disguises), AI adapts without manual rule updates.

4. **Multilingual Support:** AI can analyze websites in multiple languages, crucial for global protection.

5. **Nuanced Judgment:** AI provides graduated safety scores rather than binary safe/unsafe decisions, helping parents make informed choices based on their child's maturity.

**How it improves the product:**

- **Proactive Protection:** Parents can check websites before allowing access, preventing exposure to harmful content
- **Educational Tool:** Safety scores and detailed explanations help children learn safe browsing habits
- **Reduced Parental Anxiety:** Automated analysis saves parents from manually reviewing every website
- **Real-time Accuracy:** Always up-to-date assessments without requiring database updates or rule changes
- **Comprehensive Coverage:** Works for any website, including new or obscure sites not in safety databases

### 2. AI Parent Safety Assistant (Chatbot)

**What it does:**

An intelligent chatbot that provides 24/7 guidance to parents on child safety topics and platform navigation.

**Input:**
- Parent questions about child safety, cyberbullying, screen time, platform features, etc.
- Conversation history for context-aware responses

**Output:**
- Expert advice on digital parenting
- Step-by-step guidance on using SacredEyes features
- Personalized recommendations based on parent concerns
- Resources and best practices for child online safety

**How it works:**
1. Parent types a question in the chat interface
2. Message is sent to OpenAI GPT-5 with specialized system prompts focused on:
   - Child online safety expertise
   - SacredEyes platform features
   - Digital parenting best practices
   - Age-appropriate content guidelines
3. AI streams responses in real-time with helpful, supportive tone
4. Maintains conversation context for follow-up questions

**Example conversations:**
\`\`\`
Parent: "How do I talk to my 10-year-old about online stranger danger?"

AI: "Great question! Here's an age-appropriate approach for 10-year-olds:

1. Keep it simple: Explain that people online aren't always who they say they are
2. Set clear rules: Never share personal info (address, school, phone number)
3. Role-play scenarios: Practice 'what would you do if...' situations
4. Emphasize trust: Make sure they know they can tell you anything without punishment
5. Use SacredEyes together: Review their website scanning history weekly

Would you like specific conversation starters or advice on a particular platform?"
\`\`\`

**Why AI was chosen:**

1. **24/7 Availability:** Parents need help at any time, especially during incidents. AI provides immediate support without waiting for human agents.

2. **Personalized Guidance:** AI adapts responses based on the specific question, child's age, and family context rather than generic FAQ answers.

3. **Comprehensive Knowledge:** Trained on vast digital safety resources, parenting research, and platform documentation that no single human expert could memorize.

4. **Non-judgmental Support:** Parents may feel embarrassed asking basic questions. AI provides judgment-free guidance encouraging engagement.

5. **Scalable Expertise:** Can help unlimited parents simultaneously without quality degradation.

**How it improves the product:**

- **Reduces Support Burden:** Handles common questions automatically, freeing human support for complex cases
- **Increases User Confidence:** Parents feel supported and empowered to protect their children
- **Improves Retention:** Users stay engaged with accessible, helpful guidance
- **Educational Value:** Teaches parents about evolving online threats and best practices
- **Platform Adoption:** Helps users discover and utilize all SacredEyes features effectively

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (for database)
- Vercel account (for AI Gateway - optional, has fallback)

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/iseoluwapauls-projects/v0-child-safety-website.git
   cd v0-child-safety-website
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**

   The project uses Supabase for database and authentication. Environment variables are pre-configured if you're deploying through v0.app/Vercel integration.

   For local development, create a `.env.local` file:
   \`\`\`bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

   # AI Gateway (Optional - has fallback)
   AI_GATEWAY_API_KEY=your_ai_gateway_key
   \`\`\`

4. **Set up the database:**

   Run the SQL scripts in the `scripts/` folder in order:
   - `001_initial_schema.sql` - Creates base tables
   - `002_create_triggers.sql` - Sets up user triggers
   - `003_rls_policies.sql` - Configures Row Level Security
   - Continue with subsequent scripts as needed

   You can run these in the Supabase SQL Editor or using v0's built-in script execution.

5. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Running the Project

**Development Mode:**
\`\`\`bash
npm run dev
\`\`\`
Opens on `http://localhost:3000` with hot-reload enabled.

**Production Build:**
\`\`\`bash
npm run build
npm start
\`\`\`

**Database Scripts:**
All SQL migration scripts are in the `/scripts` folder and can be executed through v0.app interface or Supabase dashboard.

---

## Key Features

### For Parents
- **Dashboard Overview:** View statistics on children's online activity
- **Child Activity Monitoring:** See all websites scanned by children with safety scores
- **Website Safety Checker:** Test any website before allowing access
- **AI Safety Assistant:** Get expert guidance on digital parenting
- **Multi-Child Management:** Monitor multiple children from one account
- **Waitlist for Desktop App:** Join early access for device-level protection

### For Children
- **Simple Safety Scanner:** Enter website URL to check if it's safe
- **Visual Safety Indicators:** Color-coded scores (green/yellow/red)
- **Age-Appropriate Explanations:** Clear guidance on why sites may be unsafe
- **Activity History:** Review past scans

---

## Project Structure

\`\`\`
v0-child-safety-website/
├── app/
│   ├── api/                     # API routes
│   │   ├── scan-website/        # AI website safety scanner
│   │   ├── parent-chat/         # AI chatbot for parents
│   │   ├── child-activity/      # Child activity tracking
│   │   └── waitlist/            # Waitlist signups
│   ├── dashboard/               # Parent dashboard pages
│   ├── child-dashboard/         # Child dashboard
│   ├── login/                   # Authentication pages
│   └── signup/
├── components/
│   ├── dashboard/               # Dashboard components
│   ├── ui/                      # shadcn/ui components
│   └── [feature-components]     # Landing page sections
├── lib/
│   └── supabase/               # Supabase client configuration
├── scripts/                     # Database migration scripts
└── public/                     # Static assets
\`\`\`

---

## Database Schema

### Key Tables
- **profiles:** User account information (parents and children)
- **parent_profiles:** Parent-specific data
- **child_users:** Child user data with parent_id links
- **website_scans:** History of all website safety scans
- **activity_logs:** Detailed activity tracking
- **waitlist:** Early access signups

All tables use Row Level Security (RLS) for data protection.

---

## Deployment

### Automatic Deployment via v0.app

This project automatically deploys to Vercel through the v0.app integration:

1. Make changes in [v0.app chat](https://v0.app/chat/hvBEF2p2aHr)
2. Changes are automatically pushed to GitHub
3. Vercel automatically deploys from the `main` branch

**Live Deployment:** [https://vercel.com/iseoluwapauls-projects/v0-child-safety-website](https://vercel.com/iseoluwapauls-projects/v0-child-safety-website)

### Manual Deployment

1. **Deploy to Vercel:**
   \`\`\`bash
   vercel
   \`\`\`

2. **Configure Environment Variables:**
   Add all environment variables in the Vercel dashboard under Project Settings → Environment Variables

3. **Run Database Migrations:**
   Execute SQL scripts in Supabase dashboard

---

## AI Configuration

### Using Vercel AI Gateway (Recommended)

The project uses Vercel AI Gateway for AI requests:
- No additional setup needed if deployed through Vercel
- Automatically handles API keys and rate limiting
- Provides usage analytics

### Fallback Mode

If AI Gateway is unavailable or encounters errors:
- Website scanner falls back to rule-based URL analysis
- Still provides safety assessments based on domain patterns and keywords
- Ensures the app always works even without AI credits

---

## Future Roadmap

1. **Desktop App Development**
   - Native Windows and macOS applications
   - System-level website interception
   - Real-time blocking before page load

2. **Mobile Apps**
   - Android and iOS native apps
   - Device-level content filtering
   - Background protection services

3. **Enhanced AI Features**
   - Image content analysis
   - Video content safety scanning
   - Social media post monitoring
   - Real-time threat detection

4. **Parental Controls**
   - Screen time management
   - App blocking and allowlisting
   - Scheduled access controls
   - Location tracking integration

5. **Community Features**
   - Parent forums and support groups
   - Shared safe website lists
   - Educational resources library

---

## Contributing

This project is primarily built and maintained through [v0.app](https://v0.app), Vercel's AI-powered development platform. While the repository stays in sync with v0 chats, contributions and suggestions are welcome.

---

## License

This project is built using v0.app by Vercel.

---

## Support

For questions or issues:
- Visit the [v0.app chat](https://v0.app/chat/hvBEF2p2aHr)
- Check the [Vercel deployment](https://vercel.com/iseoluwapauls-projects/v0-child-safety-website)

---

## Acknowledgments

- **Built with [v0.app](https://v0.app)** - Vercel's AI-powered development platform
- **Powered by Vercel AI SDK** - For intelligent website analysis and chatbot features
- **Supabase** - For database and authentication infrastructure
- **OpenAI GPT-5** - For advanced content analysis and natural conversations

---

**SacredEyes** - Protecting children in the digital age, one website at a time.
