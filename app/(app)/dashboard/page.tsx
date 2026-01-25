import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="mx-auto w-full max-w-none px-5 py-12 sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your CarHive dashboard
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Active Bookings</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Current reservations</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Total Bookings</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Favorite Cars</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Saved vehicles</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <p className="text-muted-foreground">No recent activity to display</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/cars"
              className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 hover:bg-neutral-900/90"
            >
              Browse Cars
            </a>
            <a
              href="/bookings"
              className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              View Bookings
            </a>
            <a
              href="/profile"
              className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
