import { db } from "@/db"
import { bookingsTable, SelectBooking, InsertBooking } from "@/db/schema"
import { eq, desc, and } from "drizzle-orm"

export async function createBooking(data: InsertBooking): Promise<SelectBooking | null> {
  if (!db) return null

  try {
    const [booking] = await db.insert(bookingsTable).values(data).returning()
    return booking
  } catch (error) {
    console.error("Error creating booking:", error)
    return null
  }
}

export async function getBookingsByUserId(userId: string): Promise<SelectBooking[]> {
  if (!db) return []

  try {
    return await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.userId, userId))
      .orderBy(desc(bookingsTable.createdAt))
  } catch (error) {
    console.error("Error fetching user bookings:", error)
    return []
  }
}

export async function getBookingsByEmail(email: string): Promise<SelectBooking[]> {
  if (!db) return []

  try {
    return await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.email, email))
      .orderBy(desc(bookingsTable.createdAt))
  } catch (error) {
    console.error("Error fetching guest bookings:", error)
    return []
  }
}

export async function getAllBookings(): Promise<SelectBooking[]> {
  if (!db) return []

  try {
    return await db
      .select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt))
  } catch (error) {
    console.error("Error fetching all bookings:", error)
    return []
  }
}

export async function getBookingById(id: number): Promise<SelectBooking | null> {
  if (!db) return null

  try {
    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, id))
    return booking || null
  } catch (error) {
    console.error("Error fetching booking:", error)
    return null
  }
}

export async function updateBookingStatus(
  id: number,
  status: string
): Promise<SelectBooking | null> {
  if (!db) return null

  try {
    const [booking] = await db
      .update(bookingsTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookingsTable.id, id))
      .returning()
    return booking
  } catch (error) {
    console.error("Error updating booking status:", error)
    return null
  }
}

export async function checkDuplicateBooking(
  identifier: { userId?: string | null; email?: string },
  carId: number,
  checkinDate: Date,
  checkoutDate: Date
): Promise<boolean> {
  if (!db) return false

  try {
    // Build the where clause based on whether we have userId or email
    const whereConditions = [
      eq(bookingsTable.carId, carId),
      eq(bookingsTable.status, "pending")
    ]

    // Check by userId for authenticated users, or by email for guests
    if (identifier.userId) {
      whereConditions.push(eq(bookingsTable.userId, identifier.userId))
    } else if (identifier.email) {
      whereConditions.push(eq(bookingsTable.email, identifier.email))
    } else {
      return false // No identifier provided
    }

    const existingBookings = await db
      .select()
      .from(bookingsTable)
      .where(and(...whereConditions))

    // Check if there's an overlapping booking
    return existingBookings.some((booking: any) => {
      const bookingCheckin = new Date(booking.checkinDate)
      const bookingCheckout = new Date(booking.checkoutDate)
      
      // Check for date overlap
      return (
        (checkinDate >= bookingCheckin && checkinDate < bookingCheckout) ||
        (checkoutDate > bookingCheckin && checkoutDate <= bookingCheckout) ||
        (checkinDate <= bookingCheckin && checkoutDate >= bookingCheckout)
      )
    })
  } catch (error) {
    console.error("Error checking duplicate booking:", error)
    return false
  }
}
