import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getBookingsByUserId } from "@/db/queries/booking-repository"
import { format } from "date-fns"
import CldImage from "@/components/cld-image"
import { Badge } from "@/components/ui/badge"

export default async function BookingsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const bookings = await getBookingsByUserId(userId)

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your car rental reservations
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-card rounded-lg border p-8 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-8 text-neutral-600"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">
              Start browsing our collection of luxury vehicles
            </p>
            <a
              href="/cars"
              className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-6 py-2 text-sm font-medium text-neutral-50 hover:bg-neutral-900/90"
            >
              Browse Cars
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card rounded-lg border p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Car Image */}
                  <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg md:w-48">
                    <CldImage
                      src={
                        booking.carImageUrl &&
                        (booking.carImageUrl.startsWith("/") ||
                          booking.carImageUrl.startsWith("http"))
                          ? booking.carImageUrl
                          : "/assets/images/cars/sedan.jpg"
                      }
                      alt={booking.carName}
                      fill
                      sizes="(max-width: 768px) 100vw, 192px"
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
                          Booking ID: #{booking.id}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      <div className="text-muted-foreground text-sm">
                        <p>Booked on {format(new Date(booking.createdAt), "MMM dd, yyyy")}</p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-muted-foreground text-sm">Notes:</p>
                        <p className="mt-1 text-sm">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
