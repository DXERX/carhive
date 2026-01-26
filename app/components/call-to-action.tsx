import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

export function CallToAction() {
  const locale = getLocale()
  const { home, common } = getTranslations(locale)

  return (
    <section>
      <div className="mx-auto max-w-none px-5 sm:max-w-[90%] sm:px-0 lg:max-w-4xl">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="whitespace-nowrap text-balance text-[25px] font-bold leading-9 tracking-[-0.6px] md:text-[28px]">
            {home.ctaTitleLine1} <br />
            {home.ctaTitleLine2}
          </h2>
          <div className="flex justify-start md:justify-end">
            <Button className="rounded-[10px] px-4 py-0 text-[14px]" asChild>
              <Link href={"/cars"}>{common.browseCars}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
