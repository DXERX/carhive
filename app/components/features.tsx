import { ClickIcon } from "@/components/icons/click"
import { FilterSearchIcon } from "@/components/icons/filter-search"
import { MapPinIcon } from "@/components/icons/map-pin"
import { ShieldCheckIcon } from "@/components/icons/shield-check"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"
import { getActiveFeatures } from "@/db/queries/content-repository"
import { logger } from "@/lib/logger"

const featureIcons: Record<string, any> = {
  click: ClickIcon,
  shield: ShieldCheckIcon,
  "map-pin": MapPinIcon,
  filter: FilterSearchIcon,
}

export async function Features() {
  const locale = getLocale()
  const { home } = getTranslations(locale)
  
  let features = []

  try {
    // Try to fetch from database
    const dbFeatures = await getActiveFeatures()
    if (dbFeatures && dbFeatures.length > 0) {
      logger.info(`Loaded ${dbFeatures.length} features from database`, "features-component")
      features = dbFeatures
    } else {
      logger.info("No features found in database, using fallback", "features-component")
      features = home.features.map((f: any) => ({
        title: f.title,
        description: f.description,
        icon: "click",
      }))
    }
  } catch (error) {
    logger.error("Failed to load features from database", "features-component", error)
    // Fallback to hardcoded features
    features = home.features.map((f: any) => ({
      title: f.title,
      description: f.description,
      icon: "click",
    }))
  }

  return (
    <section>
      <div className="mx-auto max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
        <h2 className="text-balance text-[19px] font-bold sm:text-[21px] lg:text-[23px] xl:text-center">
          {home.featuresTitle}
        </h2>
        <div className="pt-8 lg:pt-10">
          <div className="grid grid-cols-1 items-start justify-between gap-x-5 gap-y-9 text-neutral-600 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
            {features.map((feature: any, index: number) => {
              const Icon = featureIcons[feature.icon || "click"] ?? ClickIcon
              return (
                <div key={index} className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-2 text-neutral-950 sm:flex-row sm:items-center">
                    <Icon className="size-4 shrink-0" />
                    <h3 className="text-[14px] font-semibold tracking-[0.015em]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-balance text-[14px] leading-[23px] text-neutral-600 sm:text-[15px] sm:leading-normal md:leading-[26px] lg:text-[16px]">
                    {feature.description}
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
