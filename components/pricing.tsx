import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Individual Device",
    price: "$3",
    period: "/month per device",
    description: "Single device protection",
    features: [
      "Real-time AI website scanning",
      "DNS-level filtering",
      "Activity monitoring",
      "Safety reports",
      "1 device installation",
      "Basic support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Family Plan",
    price: "$6",
    period: "/month",
    description: "Protection for 2-5 devices",
    features: [
      "All Individual features",
      "Up to 5 device installations",
      "Multiple child profiles",
      "Advanced analytics",
      "Custom whitelist/blacklist",
      "Priority support",
      "Family activity dashboard",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "School/Institution",
    price: "",
    period: "",
    description: "Bulk device protection for educational and institutional clients",
    features: [
      "All Family Plan features",
      "Unlimited devices",
      "Centralized management",
      "Volume discounts",
      "Custom policy controls",
      "Dedicated account manager",
      "24/7 enterprise support",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl mb-4 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground text-balance">Choose the plan that fits your family's needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl border-2 p-8 shadow-sm transition-all hover:shadow-lg ${
                plan.popular ? "border-primary scale-105" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
