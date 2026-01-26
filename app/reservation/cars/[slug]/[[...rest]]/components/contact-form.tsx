"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CheckIcon } from "@/components/icons/check"
import { CurrencyDollarIcon } from "@/components/icons/currency-dollar"
import { HeadsetIcon } from "@/components/icons/headset"
import { createBookingAction } from "../actions"
import { useLocale } from "@/hooks/use-locale"
import { getTranslations } from "@/lib/i18n"

interface ContactFormProps {
  carSlug: string
  carName: string
  pickupLocation: string
  checkinDate: Date
  checkoutDate: Date
  totalPrice: number
  currency: string
}

export function ContactForm({
  carSlug,
  carName,
  pickupLocation,
  checkinDate,
  checkoutDate,
  totalPrice,
  currency,
}: ContactFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { locale } = useLocale()
  const { reservation } = getTranslations(locale)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createBookingAction({
        carSlug,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        pickupLocation,
        checkinDate,
        checkoutDate,
        totalPrice,
        currency,
        notes: formData.notes,
      })

      // Check if result exists and has the expected structure
      if (!result) {
        toast({
          title: reservation.error,
          description: reservation.failedToCreateBooking,
          variant: "destructive",
        })
        return
      }

      if (result.success) {
        toast({
          title: reservation.reservationRequestSent,
          description: result.message || reservation.contactSoon,
        })
        
        // Redirect based on authentication status
        setTimeout(() => {
          if (isSignedIn) {
            // Authenticated users go to their bookings page
            router.push("/bookings")
          } else {
            // Guest users go to success page with details
            const params = new URLSearchParams({
              email: formData.email,
              carName: carName,
            })
            router.push(`/reservation/confirmation/success?${params.toString()}`)
          }
        }, 1000)
      } else {
        toast({
          title: reservation.error,
          description: result.error || reservation.failedToCreateBooking,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: reservation.error,
        description: reservation.somethingWentWrong,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">{reservation.contactInformation}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="fullName">{reservation.fullName} *</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder={reservation.fullNamePlaceholder}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="email">{reservation.email} *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={reservation.emailPlaceholder}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="phone">{reservation.phone} *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder={reservation.phonePlaceholder}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="whatsapp">{reservation.whatsapp}</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder={reservation.whatsappPlaceholder}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="notes">{reservation.additionalNotes}</Label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder={reservation.notesPlaceholder}
            className="mt-2 flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm text-blue-900">
            <CheckIcon className="size-4 text-green-600" />
            <strong>{reservation.noCreditCard}</strong>
          </p>
          <p className="space-y-1 text-sm text-blue-800">
            <span className="flex items-center gap-2">
              <CurrencyDollarIcon className="size-4" />
              {reservation.cashPayment}
            </span>
            <span className="flex items-center gap-2">
              <HeadsetIcon className="size-4" />
              {reservation.confirmContact}
            </span>
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full text-base font-semibold"
        >
          {isSubmitting ? reservation.sendingRequest : reservation.sendReservationRequest}
        </Button>

        <p className="mt-4 text-center text-xs text-neutral-500">
          {reservation.termsNotice}
        </p>
      </form>
    </div>
  )
}
