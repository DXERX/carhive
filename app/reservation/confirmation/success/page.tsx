import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "@/components/icons/check"
import { HeadsetIcon } from "@/components/icons/headset"
import { Mail } from "lucide-react"
import { SuccessPageClient } from "./success-page-client"

export const metadata: Metadata = {
  title: "Booking Confirmed - CarHive",
  description: "Your car rental booking request has been received",
}

export default function BookingSuccessPage({
  searchParams,
}: {
  searchParams: { email?: string; carName?: string }
}) {
  const { email, carName } = searchParams

  return <SuccessPageClient email={email} carName={carName} />
}
