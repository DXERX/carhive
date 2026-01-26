import { cookies, headers } from "next/headers"

import { defaultLocale, isLocale, Locale, locales } from "./i18n"

function parseAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null

  const candidates = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean)

  for (const candidate of candidates) {
    if (isLocale(candidate)) return candidate
    const base = candidate.split("-")[0]
    if (isLocale(base)) return base
  }

  return null
}

export function getLocale(): Locale {
  const cookieLocale = cookies().get("locale")?.value
  if (isLocale(cookieLocale)) return cookieLocale

  const headerLocale = parseAcceptLanguage(headers().get("accept-language"))
  if (headerLocale) return headerLocale

  return defaultLocale
}

export function getLocaleDir(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr"
}

export function getAvailableLocales() {
  return locales
}
