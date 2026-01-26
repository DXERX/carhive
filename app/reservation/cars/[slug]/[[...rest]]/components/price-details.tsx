import { formatAmountForDisplay } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

export function PriceDetails({
  days,
  currency,
  subtotal,
  taxes,
}: {
  days: number
  currency: string
  subtotal: number
  taxes: number
}) {
  const locale = getLocale()
  const { reservation } = getTranslations(locale)

  return (
    <>
      <h2 className="text-xl font-semibold">{reservation.yourTotal}</h2>
      <div className="pt-5">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-row items-center justify-between text-[15px]">
            <span>
              {days} {days === 1 ? reservation.day : reservation.days}
            </span>
            <span>{formatAmountForDisplay(subtotal, currency)}</span>
          </div>
          <div className="flex flex-row items-center justify-between text-[15px]">
            <span>{reservation.taxes}</span>
            <span>{formatAmountForDisplay(taxes, currency)}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex flex-row items-center justify-between">
            <strong>{reservation.total} ({currency.toUpperCase()})</strong>
            <strong>
              {formatAmountForDisplay(subtotal + taxes, currency)}
            </strong>
          </div>
        </div>
      </div>
    </>
  )
}
