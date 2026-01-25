import { Headset, ShieldCheck, Navigation, Clock } from "lucide-react"

const services = [
  {
    icon: Navigation,
    title: "Modern Vehicles",
    description: "Latest model cars, clean and well-maintained for your comfort",
  },
  {
    icon: ShieldCheck,
    title: "Airport Service",
    description: "Quick pickup and delivery directly from Istanbul Airport",
  },
  {
    icon: Navigation,
    title: "Flexible Payment",
    description: "No credit card required - cash payment accepted",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Book anytime, reliable service around the clock",
  },
]

export function VipServices() {
  return (
    <section className="mx-auto w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-8xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Why Choose Avis Istanbul Airport
        </h2>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, idx) => {
          const Icon = service.icon
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
