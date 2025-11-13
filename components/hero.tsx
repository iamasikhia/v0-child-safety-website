import { Button } from "@/components/ui/button"
import { Download, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { WebsiteSafetyModal } from "@/components/website-safety-modal"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                <ShieldCheck className="h-4 w-4" />
                Join Thounsands of Families Worldwide
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
                Protect your child online with <span className="text-primary">smart AI filtering</span>
              </h1>

              <p className="mb-16 text-lg text-muted-foreground md:text-xl text-balance">
                Install our desktop app to enable DNS-level filtering that scans and blocks inappropriate websites in
                real-time, keeping your children safe while browsing.
              </p>

              <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8"
                >
                  <Download className="h-5 w-5" />
                  Download for Free
                </Button>
                <WebsiteSafetyModal />
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6" viewBox="0 0 88 88" fill="currentColor">
                    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" />
                  </svg>
                  <span className="text-sm font-medium text-muted-foreground">Windows</span>
                </div>
              
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/design-mode/image.png"
                    alt="Android"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="text-sm font-medium text-muted-foreground">Android</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  <span className="text-sm font-medium text-muted-foreground">iOS</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-full overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/child-using-device.jpg"
                  alt="Child safely browsing on a device with SacredEyes protection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl -z-10"></div>
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-secondary/40 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-20">
          <div className="aspect-square w-[600px] rounded-full bg-primary"></div>
        </div>
      </div>
    </section>
  )
}
