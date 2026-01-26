import { ShieldCheck, Navigation, Clock } from "lucide-react"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

export function VipServices() {
  const locale = getLocale()
  const { home } = getTranslations(locale)

  const serviceIcons = [Navigation, ShieldCheck, Navigation, Clock]

  return (
    <section className="mx-auto w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-8xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {home.vipTitle}
        </h2>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {home.vipServices.map((service, idx) => {
          const Icon = serviceIcons[idx] ?? Navigation
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                <Icon className="size-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
