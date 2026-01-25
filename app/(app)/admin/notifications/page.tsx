import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SendNotificationForm } from "./components/send-notification-form"
import { NotificationHistory } from "./components/notification-history"
import { Bell, Users, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Notifications - Admin",
  description: "Send notifications to users",
}

export default async function AdminNotificationsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Send notifications to your users
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Bell className="size-4" />
              Total Sent
            </CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Users className="size-4" />
              Active Users
            </CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="size-4" />
              Read Rate
            </CardDescription>
            <CardTitle className="text-3xl">0%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Send Notification Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
            <CardDescription>
              Broadcast a message to all users or specific groups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SendNotificationForm />
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              View notification history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationHistory />
          </CardContent>
        </Card>
      </div>

      {/* Feature Info */}
      <Card className="mt-6 border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Bell className="mt-0.5 size-5 text-blue-600" />
            <div>
              <h3 className="mb-1 font-semibold text-blue-900">Real-time Notifications</h3>
              <p className="text-sm text-blue-700">
                Notifications are displayed to logged-in users when they visit the site. 
                For real-time push notifications, you can integrate services like Pusher, Socket.io, or Firebase Cloud Messaging.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
