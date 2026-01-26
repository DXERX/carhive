"use client"

import { useEffect, useMemo, useState } from "react"

import { defaultLocale, isLocale, Locale, locales } from "@/lib/i18n"

function getCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/)
  const value = match?.[1]
  if (isLocale(value)) return value
  return null
}

function getNavigatorLocale(): Locale | null {
  if (typeof navigator === "undefined") return null
  const value = navigator.language?.toLowerCase()
  if (isLocale(value)) return value
  const base = value?.split("-")[0]
  if (isLocale(base)) return base
  return null
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const cookieLocale = getCookieLocale()
    if (cookieLocale) {
      setLocale(cookieLocale)
      return
    }
    const navLocale = getNavigatorLocale()
    if (navLocale) setLocale(navLocale)
  }, [])

  const availableLocales = useMemo(() => locales, [])

  return { locale, setLocale, availableLocales }
}
