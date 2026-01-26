import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { getAllBookings } from "@/db/queries/booking-repository"
import { format } from "date-fns"
import CldImage from "@/components/cld-image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UpdateBookingStatus } from "../components/update-booking-status"

export const metadata = {
  title: "Admin Dashboard - CarHive",
  description: "Manage all bookings and reservations",
}

export default async function AdminDashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  // Check if user is admin (you can customize this logic)
  // For now, checking if email is your admin email
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  const isAdmin = user?.emailAddresses.some(email => 
    adminEmails.includes(email.emailAddress)
  )

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const bookings = await getAllBookings()

  // Calculate stats
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter(b => b.status === "pending").length
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length
  const totalRevenue = bookings
    .filter(b => b.status !== "cancelled")
    .reduce((sum, b) => sum + Number(b.totalPrice), 0)

  // Group bookings by country
  const bookingsByCountry = bookings.reduce((acc, booking) => {
    const country = booking.country || "Unknown"
    acc[country] = (acc[country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="mx-auto w-full max-w-none px-5 py-12 sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage all bookings and view statistics
            </p>
          </div>
          <a href="/admin/cars">
            <Button variant="outline">
              Manage Cars
            </Button>
          </a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="text-muted-foreground mb-1 text-sm">Total Bookings</div>
            <div className="text-3xl font-bold">{totalBookings}</div>
          </Card>
          <Card className="p-6">
            <div className="text-muted-foreground mb-1 text-sm">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{pendingBookings}</div>
          </Card>
          <Card className="p-6">
            <div className="text-muted-foreground mb-1 text-sm">Confirmed</div>
            <div className="text-3xl font-bold text-green-600">{confirmedBookings}</div>
          </Card>
          <Card className="p-6">
            <div className="text-muted-foreground mb-1 text-sm">Total Revenue</div>
            <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
          </Card>
        </div>

        {/* Bookings by Country */}
        {Object.keys(bookingsByCountry).length > 0 && (
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Bookings by Location</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.entries(bookingsByCountry).map(([country, count]) => (
                <div key={country} className="rounded-lg bg-neutral-50 p-3 text-center">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-muted-foreground text-sm">{country}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* All Bookings */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">All Bookings</h2>
          {bookings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No bookings yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Car Image */}
                    <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg lg:w-48">
                      <CldImage
                        src={
                          booking.carImageUrl &&
                          (booking.carImageUrl.startsWith("/") ||
                            booking.carImageUrl.startsWith("http"))
                            ? booking.carImageUrl
                            : booking.carSlug
                              ? `/assets/images/cars/catalog/${booking.carSlug}.jpg`
                              : "/assets/images/cars/sedan.jpg"
                        }
                        alt={booking.carName}
                        fill
                        sizes="(max-width: 1024px) 100vw, 192px"
                        className="object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="mb-1 text-xl font-semibold">
                            {booking.carName}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Booking ID: #{booking.id} | User ID: {booking.userId}
                          </p>
                        </div>
                        <UpdateBookingStatus bookingId={booking.id} currentStatus={booking.status} />
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-muted-foreground text-sm">Customer</p>
                          <p className="font-medium">{booking.fullName}</p>
                          <p className="text-muted-foreground text-sm">{booking.email}</p>
                          <p className="text-muted-foreground text-sm">{booking.phone}</p>
                          {booking.whatsapp && (
                            <p className="text-sm text-green-600">WhatsApp: {booking.whatsapp}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Pickup</p>
                          <p className="font-medium">
                            {format(new Date(booking.checkinDate), "MMM dd, yyyy")}
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {booking.pickupLocation}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Return</p>
                          <p className="font-medium">
                            {format(new Date(booking.checkoutDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-4">
                        <div>
                          <p className="text-muted-foreground text-sm">Total Price</p>
                          <p className="text-2xl font-bold">
                            ${Number(booking.totalPrice).toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground text-sm">
                            Booked: {format(new Date(booking.createdAt), "MMM dd, yyyy HH:mm")}
                          </p>
                          {booking.country && (
                            <p className="text-muted-foreground text-sm">
                              Location: {booking.city}, {booking.country}
                            </p>
                          )}
                          {booking.ipAddress && (
                            <p className="text-muted-foreground text-xs">
                              IP: {booking.ipAddress}
                            </p>
                          )}
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 border-t pt-4">
                          <p className="text-muted-foreground text-sm">Customer Notes:</p>
                          <p className="mt-1 text-sm">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
