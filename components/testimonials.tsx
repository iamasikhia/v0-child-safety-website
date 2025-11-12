import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Mother of 2",
    content:
      "SacredEyes gives me peace of mind. I can finally let my kids explore the internet without constant worry.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Elementary School Teacher",
    content:
      "We use SacredEyes in our computer lab. The AI detection is incredibly accurate and the interface is simple enough for staff to manage.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Parent & Tech Professional",
    content:
      "As someone who works in tech, I appreciate the privacy-first approach and transparent AI. Best parental control solution I've found.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl mb-4 text-balance">
            Trusted by families everywhere
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Join thousands of parents who protect their children with SacredEyes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-6 text-card-foreground leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
