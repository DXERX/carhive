"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "@/components/icons/check"
import { HeadsetIcon } from "@/components/icons/headset"
import { Mail } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { getTranslations } from "@/lib/i18n"

interface SuccessPageClientProps {
  email?: string
  carName?: string
}

export function SuccessPageClient({ email, carName }: SuccessPageClientProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)
  const { locale } = useLocale()
  const { reservationSuccess } = getTranslations(locale)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckIcon className="size-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">{reservationSuccess.title}</CardTitle>
          <CardDescription className="text-base">{reservationSuccess.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-green-50 p-4 text-center">
            <p className="text-green-900">
              <strong>
                {reservationSuccess.received.replace(
                  "{carName}",
                  carName ? ` ${carName}` : ""
                )}
              </strong>
            </p>
            {email && (
              <p className="text-muted-foreground mt-2 text-sm">
                {reservationSuccess.emailSent.replace("{email}", email)}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <HeadsetIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{reservationSuccess.nextTitle}</h3>
                <p className="text-muted-foreground text-sm">
                  {reservationSuccess.nextDescription}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <Mail className="size-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">{reservationSuccess.emailTitle}</h3>
                <p className="text-muted-foreground text-sm">
                  {reservationSuccess.emailDescription}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                <CheckIcon className="size-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">{reservationSuccess.referenceTitle}</h3>
                <p className="text-muted-foreground text-sm">
                  {reservationSuccess.referenceDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              <strong>{reservationSuccess.needHelp}</strong> Contact us at{" "}
              <a href="mailto:support@carhive.com" className="underline">
                support@carhive.com
              </a>{" "}
              or call us at +1 (555) 123-4567
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/">{reservationSuccess.returnHome}</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/cars">{reservationSuccess.browseMoreCars}</Link>
            </Button>
          </div>

          <div className="text-muted-foreground border-t pt-4 text-center text-sm">
            {reservationSuccess.redirecting.replace("{count}", String(countdown))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
