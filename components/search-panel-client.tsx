"use client"

import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { useLocale } from "@/hooks/use-locale"
import { getTranslations } from "@/lib/i18n"

type Location = {
  id: number
  name: string
  slug: string
  latitude: number
  longitude: number
}

export function SearchPanelClient(props: any) {
  const { locale } = useLocale()
  const { home } = getTranslations(locale)
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch locations client-side to avoid blocking server render
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch locations:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse rounded-lg border bg-white p-8">
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (!locations.length) return null

  const localizedLocations = locations.map((location: any) => {
    const localizedName =
      locale === "ar"
        ? location.nameAr ?? location.name
        : locale === "tr"
          ? location.nameTr ?? location.name
          : location.name

    return {
      ...location,
      name: localizedName,
    }
  })

  return (
    <SearchPanel locations={localizedLocations} labels={home.search} {...props} />
  )
}
