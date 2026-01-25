import { auth, currentUser, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserCircle, Mail, Calendar, Shield } from "lucide-react"
import { AddAdminDialog } from "./components/add-admin-dialog"
import { UserActions } from "./components/user-actions"
import { isAdminByEmail, getAllAdmins } from "@/db/queries/admin-repository"

export const metadata = {
  title: "User Management - Admin",
  description: "Manage all users and admin roles",
}

export default async function AdminUsersPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress
  if (!userEmail || !(await isAdminByEmail(userEmail))) {
    redirect("/dashboard")
  }

  // Get all users from Clerk
  const client = await clerkClient()
  const usersResponse = await client.users.getUserList({
    limit: 100,
    orderBy: '-created_at'
  })
  const users = usersResponse.data

  // Get all admins from database
  const dbAdmins = await getAllAdmins()
  const adminUserIds = new Set(dbAdmins.map((a: any) => a.userId))
  const adminEmails = dbAdmins.map((a: any) => a.email)

  // Calculate stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.lastSignInAt && 
    new Date(u.lastSignInAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length
  const adminUsers = users.filter(u => adminUserIds.has(u.id)).length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all users and assign admin roles
          </p>
        </div>
        <AddAdminDialog currentAdmins={adminEmails}>
          <Button>
            <Shield className="mr-2 size-4" />
            Add Admin
          </Button>
        </AddAdminDialog>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{totalUsers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active (Last 7 Days)</CardDescription>
            <CardTitle className="text-3xl text-green-600">{activeUsers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Admins</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{adminUsers}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => {
              const isUserAdmin = adminUserIds.has(user.id)
              const createdAt = new Date(user.createdAt)
              const email = user.emailAddresses[0]?.emailAddress
              const lastSignIn = user.lastSignInAt ? new Date(user.lastSignInAt) : null

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-semibold text-white">
                      {user.firstName?.[0] || email?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {user.firstName || user.lastName 
                            ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                            : 'No Name'
                          }
                        </p>
                        {isUserAdmin && (
                          <Badge variant="default" className="bg-blue-600">
                            <Shield className="mr-1 size-3" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <div className="text-muted-foreground mt-1 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Mail className="size-3" />
                          {email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          Joined {createdAt.toLocaleDateString()}
                        </span>
                        {lastSignIn && (
                          <span className="flex items-center gap-1">
                            <UserCircle className="size-3" />
                            Last seen {lastSignIn.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <UserActions 
                    userId={user.id} 
                    userEmail={email || ''} 
                    isAdmin={isUserAdmin}
                    currentAdmins={adminEmails}
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
