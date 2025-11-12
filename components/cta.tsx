import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6 text-balance">
            Ready to protect your family?
          </h2>
          <p className="text-lg mb-10 text-primary-foreground/90 text-balance max-w-2xl mx-auto">
            Join thousands of parents using SacredEyes to create a safer internet experience. Download now and get
            started in minutes.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="gap-2 text-base px-8">
              <Download className="h-5 w-5" />
              Download for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              asChild
            >
              <Link href="/signup">Create Parent Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
