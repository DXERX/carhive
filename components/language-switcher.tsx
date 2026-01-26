"use client"

import { useRouter } from "next/navigation"

import { useLocale } from "@/hooks/use-locale"
import { Locale, locales } from "@/lib/i18n"

export function LanguageSwitcher() {
  const router = useRouter()
  const { locale, setLocale } = useLocale()

  const handleChange = (value: Locale) => {
    document.cookie = `locale=${value}; path=/; max-age=31536000`
    setLocale(value)
    router.refresh()
  }

  return (
    <select
      aria-label="Select language"
      className="h-9 rounded-md border border-input bg-background px-2 text-sm"
      value={locale}
      onChange={(e) => handleChange(e.target.value as Locale)}
    >
      {locales.map((value) => (
        <option key={value} value={value}>
          {value.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
