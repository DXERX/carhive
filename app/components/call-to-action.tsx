import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"
import { getActiveCtaSections } from "@/db/queries/content-repository"
import { logger } from "@/lib/logger"

export async function CallToAction() {
  const locale = getLocale()
  const { home, common } = getTranslations(locale)

  let cta = {
    title: `${home.ctaTitleLine1} ${home.ctaTitleLine2}`,
    ctaUrl: "/cars",
    ctaText: common.browseCars,
  }

  try {
    // Try to fetch from database
    const ctaSections = await getActiveCtaSections()
    if (ctaSections && ctaSections.length > 0) {
      logger.info("Loaded CTA section from database", "cta-component")
      const section = ctaSections[0]
      cta = {
        title: section.title,
        ctaUrl: section.ctaUrl || "/cars",
        ctaText: section.ctaText || common.browseCars,
      }
    } else {
      logger.info("No CTA section found in database, using fallback", "cta-component")
    }
  } catch (error) {
    logger.error("Failed to load CTA section from database", "cta-component", error)
    // Use fallback values
  }

  return (
    <section>
      <div className="mx-auto max-w-none px-5 sm:max-w-[90%] sm:px-0 lg:max-w-4xl">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="whitespace-nowrap text-balance text-[25px] font-bold leading-9 tracking-[-0.6px] md:text-[28px]">
            {cta.title}
          </h2>
          <div className="flex justify-start md:justify-end">
            <Button className="rounded-[10px] px-4 py-0 text-[14px]" asChild>
              <Link href={cta.ctaUrl}>{cta.ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
