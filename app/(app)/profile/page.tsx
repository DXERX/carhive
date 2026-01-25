import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="mx-auto w-full max-w-none px-5 py-12 sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Full Name
              </label>
              <p className="mt-1 text-base">
                {user?.fullName || "Not set"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="mt-1 text-base">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Member Since
              </label>
              <p className="mt-1 text-base">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              Back to Dashboard
            </a>
            <a
              href="/bookings"
              className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              View Bookings
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-xl font-semibold text-red-900">Manage Account</h2>
          <p className="mb-4 text-sm text-red-700">
            To update your profile information, change your password, or manage security settings, please visit your Clerk account dashboard.
          </p>
          <a
            href={`https://dashboard.clerk.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-100"
          >
            Open Clerk Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
