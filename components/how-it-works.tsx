import { Download, Settings, ShieldCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install Desktop App",
    description: "Download SacredEyes for Windows or macOS. Installation takes under 2 minutes on your child's device.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Set Up Child Profiles",
    description:
      "Create profiles for each child with age-appropriate filtering rules. Configure DNS filtering and customize access preferences.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Monitor & Protect",
    description:
      "Desktop app filters all traffic through secure DNS. View activity, blocked attempts, and receive notifications from your parent dashboard.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 bg-gradient-to-br from-emerald-900 via-teal-950 to-emerald-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mb-4 text-balance">
            Get started in minutes
          </h2>
          <p className="text-lg text-emerald-100 text-balance">
            Simple setup process that works seamlessly across all your family's devices.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white text-2xl font-bold">
                {step.number}
              </div>

              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-teal-800/50 p-3">
                <step.icon className="h-6 w-6 text-teal-300" />
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="text-emerald-200 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
