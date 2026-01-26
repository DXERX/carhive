import { formatDateRangeForDisplay } from "@/lib/dates"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

export function BookDetails({
  checkinDate,
  checkoutDate,
}: {
  checkinDate: Date
  checkoutDate: Date
}) {
  if (!checkinDate || !checkoutDate) {
    throw new Error("Both check-in and check-out dates must be provided.")
  }

  const locale = getLocale()
  const { reservation } = getTranslations(locale)

  return (
    <>
      <h2 className="text-[22px] font-semibold">{reservation.yourTrip}</h2>
      <div className="pt-5">
        <div className="space-y-1">
          <h3 className="text-base">
            <strong>{reservation.dates}</strong>
          </h3>
          <p>
            {formatDateRangeForDisplay(
              checkinDate.toISOString(),
              checkoutDate.toISOString()
            )}
          </p>
        </div>
      </div>
    </>
  )
}
