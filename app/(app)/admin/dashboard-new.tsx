import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { getAllBookings } from "@/db/queries/booking-repository"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Calendar, 
  Car, 
  Users, 
  MapPin, 
  Bell,
  DollarSign,
  TrendingUp,
  ArrowRight
} from "lucide-react"

export const metadata = {
  title: "Admin Dashboard - CarHive",
  description: "Admin control panel",
}

export default async function AdminDashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const bookings = await getAllBookings()

  // Calculate stats
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter(b => b.status === "pending").length
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length
  const completedBookings = bookings.filter(b => b.status === "completed").length
  const totalRevenue = bookings
    .filter(b => b.status !== "cancelled")
    .reduce((sum, b) => sum + Number(b.totalPrice), 0)

  const recentBookings = bookings.slice(0, 5)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.firstName || 'Admin'}! Here's your overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Bookings
            </CardDescription>
            <CardTitle className="text-3xl">{totalBookings}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm" className="w-full">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Revenue
            </CardDescription>
            <CardTitle className="text-3xl">${totalRevenue.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {confirmedBookings} confirmed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pending
            </CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{pendingBookings}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Needs attention
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Completed
            </CardDescription>
            <CardTitle className="text-3xl text-green-600">{completedBookings}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Successfully completed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/bookings">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Bookings</p>
                  <p className="text-sm text-muted-foreground">Manage reservations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/cars">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Car className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Cars</p>
                  <p className="text-sm text-muted-foreground">Fleet management</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Users</p>
                  <p className="text-sm text-muted-foreground">User management</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/notifications">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold">Notifications</p>
                  <p className="text-sm text-muted-foreground">Send messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest reservation activity</CardDescription>
            </div>
            <Link href="/admin/bookings">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No bookings yet
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{booking.carName}</p>
                    <p className="text-sm text-muted-foreground">{booking.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${booking.totalPrice}</p>
                    <p className="text-sm text-muted-foreground capitalize">{booking.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
