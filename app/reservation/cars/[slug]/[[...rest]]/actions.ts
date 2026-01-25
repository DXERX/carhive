"use server"

import { auth } from "@clerk/nextjs/server"
import { createBooking, checkDuplicateBooking } from "@/db/queries/booking-repository"
import { getCarBySlug } from "@/db/queries/car-repository"
import { InsertBooking } from "@/db/schema"

interface CreateBookingInput {
  carSlug: string
  fullName: string
  email: string
  phone: string
  whatsapp?: string
  pickupLocation: string
  checkinDate: Date
  checkoutDate: Date
  totalPrice: number
  currency: string
  notes?: string
}

interface BookingActionResult {
  success: boolean
  bookingId?: number
  message?: string
  error?: string
}

export async function createBookingAction(data: CreateBookingInput): Promise<BookingActionResult> {
  try {
    // Get authenticated user (optional - supports guest bookings)
    const { userId } = await auth()

    // Get car details
    const car = await getCarBySlug(data.carSlug)
    
    if (!car) {
      return {
        success: false,
        error: "Car not found",
      }
    }

    // Check for duplicate/overlapping bookings (by userId if authenticated, email if guest)
    const hasDuplicate = await checkDuplicateBooking(
      { userId, email: data.email },
      car.id,
      data.checkinDate,
      data.checkoutDate
    )

    if (hasDuplicate) {
      return {
        success: false,
        error: userId 
          ? "You already have a pending booking for this car during these dates. Please check your bookings or choose different dates."
          : "A pending booking already exists with this email for this car during these dates. Please check your email or choose different dates.",
      }
    }

    // Create booking
    const bookingData: InsertBooking = {
      userId,
      carId: car.id,
      carName: car.name,
      carImageUrl: car.imageUrl || null,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp || null,
      pickupLocation: data.pickupLocation,
      checkinDate: data.checkinDate,
      checkoutDate: data.checkoutDate,
      totalPrice: data.totalPrice.toString(),
      currency: data.currency,
      notes: data.notes || null,
      status: "pending",
      ipAddress: null, // Could get from headers
      country: null,
      city: null,
    }

    const booking = await createBooking(bookingData)

    if (!booking) {
      return {
        success: false,
        error: "Failed to create booking",
      }
    }

    return {
      success: true,
      bookingId: booking.id,
      message: "Your reservation has been submitted successfully!",
    }
  } catch (error) {
    console.error("Error creating booking:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
