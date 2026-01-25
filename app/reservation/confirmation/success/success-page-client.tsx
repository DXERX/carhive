"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "@/components/icons/check"
import { HeadsetIcon } from "@/components/icons/headset"
import { Mail } from "lucide-react"

interface SuccessPageClientProps {
  email?: string
  carName?: string
}

export function SuccessPageClient({ email, carName }: SuccessPageClientProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

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
          <CardTitle className="text-2xl md:text-3xl">Booking Request Received!</CardTitle>
          <CardDescription className="text-base">Thank you for choosing CarHive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-green-50 p-4 text-center">
            <p className="text-green-900">
              <strong>We've received your reservation request{carName ? ` for ${carName}` : ""}!</strong>
            </p>
            {email && (
              <p className="text-muted-foreground mt-2 text-sm">
                A confirmation email has been sent to <strong>{email}</strong>
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <HeadsetIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">What happens next?</h3>
                <p className="text-muted-foreground text-sm">
                  Our team will review your booking request and contact you within 24 hours to confirm your reservation
                  and provide payment details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <Mail className="size-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Check your email</h3>
                <p className="text-muted-foreground text-sm">
                  We've sent a confirmation email with your booking details. Please check your inbox (and spam folder
                  just in case).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                <CheckIcon className="size-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Booking Reference</h3>
                <p className="text-muted-foreground text-sm">
                  Your booking is being processed. You'll receive a booking reference number via email once confirmed.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              <strong>Need help?</strong> Contact us at{" "}
              <a href="mailto:support@carhive.com" className="underline">
                support@carhive.com
              </a>{" "}
              or call us at +1 (555) 123-4567
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/cars">Browse More Cars</Link>
            </Button>
          </div>

          <div className="text-muted-foreground border-t pt-4 text-center text-sm">
            Redirecting to home in <strong>{countdown}</strong> seconds...
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
