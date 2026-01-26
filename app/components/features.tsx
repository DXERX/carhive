import { ClickIcon } from "@/components/icons/click"
import { FilterSearchIcon } from "@/components/icons/filter-search"
import { MapPinIcon } from "@/components/icons/map-pin"
import { ShieldCheckIcon } from "@/components/icons/shield-check"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

export function Features() {
  const locale = getLocale()
  const { home } = getTranslations(locale)

  const featureIcons = [ClickIcon, ShieldCheckIcon, MapPinIcon, FilterSearchIcon]

  return (
    <section>
      <div className="mx-auto max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
        <h2 className="text-balance text-[19px] font-bold sm:text-[21px] lg:text-[23px] xl:text-center">
          {home.featuresTitle}
        </h2>
        <div className="pt-8 lg:pt-10">
          <div className="grid grid-cols-1 items-start justify-between gap-x-5 gap-y-9 text-neutral-600 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
            {home.features.map(({ title, description }, index) => {
              const Icon = featureIcons[index] ?? ClickIcon
              return (
              <div key={index} className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-2 text-neutral-950 sm:flex-row sm:items-center">
                  <Icon className="size-4 shrink-0" />
                  <h3 className="text-[14px] font-semibold tracking-[0.015em]">
                    {title}
                  </h3>
                </div>
                <p className="text-balance text-[14px] leading-[23px] text-neutral-600 sm:text-[15px] sm:leading-normal md:leading-[26px] lg:text-[16px]">
                  {description}
                </p>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
