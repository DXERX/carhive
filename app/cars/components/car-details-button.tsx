"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { SearchParams } from "@/lib/types"
import { constructUrlWithParams } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { getTranslations } from "@/lib/i18n"

export function CarDetailsButton({ carSlug }: { carSlug: string }) {
  const searchParams = useSearchParams()
  const { locale } = useLocale()
  const { cars } = getTranslations(locale)
  const newParams = new URLSearchParams(searchParams.toString())

  const location = searchParams.get(SearchParams.LOCATION)
  const checkin = searchParams.get(SearchParams.CHECKIN)
  const checkout = searchParams.get(SearchParams.CHECKOUT)

  if (location) newParams.set(SearchParams.LOCATION, location)
  if (checkin) newParams.set(SearchParams.CHECKIN, checkin)
  if (checkout) newParams.set(SearchParams.CHECKOUT, checkout)

  const href = constructUrlWithParams(`/cars/${carSlug}`, newParams)

  return (
    <Button
      variant={"outline"}
      className="h-9 w-full hover:border-transparent hover:bg-neutral-900 hover:text-white"
      asChild
    >
      <Link href={href}>{cars.viewDetails}</Link>
    </Button>
  )
}
