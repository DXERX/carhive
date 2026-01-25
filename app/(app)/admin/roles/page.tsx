import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { getAllAdmins } from "@/db/queries/admin-repository"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, UserPlus, Users, Crown } from "lucide-react"

export const metadata = {
  title: "Admin Roles - Admin",
  description: "Manage administrator roles and permissions",
}

export default async function AdminRolesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const result = await getAllAdmins()
  const admins = result.success ? result.data : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Roles</h1>
          <p className="text-muted-foreground mt-2">
            Manage administrator roles and permissions
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 size-4" />
          Add Admin
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Admins</CardDescription>
            <CardTitle className="text-3xl">{admins.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Today</CardDescription>
            <CardTitle className="text-3xl">1</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Invites</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Current Admins */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Administrators</CardTitle>
          <CardDescription>Users with admin access to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {admins.map((admin: any) => (
              <div
                key={admin.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-semibold text-white">
                    {admin.email[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{admin.email}</p>
                      <Badge variant="default" className="bg-blue-600">
                        <Shield className="mr-1 size-3" />
                        {admin.role}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Added by: {admin.addedBy || 'system'}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Since {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Types Info */}
      <Card>
        <CardHeader>
          <CardTitle>Role Types</CardTitle>
          <CardDescription>Different administrator role levels and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Crown className="size-5 text-yellow-600" />
                <h3 className="font-semibold">Super Admin (Coming Soon)</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Full access to all features including role management, system settings, and billing.
              </p>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="size-5 text-blue-600" />
                <h3 className="font-semibold">Admin (Current)</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Access to user management, car management, bookings, and content. Cannot manage other admins.
              </p>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Users className="size-5 text-green-600" />
                <h3 className="font-semibold">Moderator (Coming Soon)</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Limited access to content management and user support. Cannot delete or create resources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border bg-blue-50 p-4 text-blue-900">
        <p className="text-sm">
          <strong>Note:</strong> This is the dedicated admin roles management page. For now, use the <a href="/admin/users" className="font-semibold underline">Users page</a> to add or remove admin access.
          Role levels (Super Admin, Moderator) will be implemented in a future update.
        </p>
      </div>
    </div>
  )
}
