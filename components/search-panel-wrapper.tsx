import { getLocations } from "@/db/queries/location-repository"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

import { SearchPanel } from "./search-panel"

export async function SearchPanelWrapper(props: any) {
  const locale = getLocale()
  const { home } = getTranslations(locale)
  const locations = await getLocations()

  if (!locations) return null

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
