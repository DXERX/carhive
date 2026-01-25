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
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all users and assign admin roles
          </p>
        </div>
        <AddAdminDialog currentAdmins={adminEmails}>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Add Admin
          </Button>
        </AddAdminDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
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
                            <Shield className="w-3 h-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined {createdAt.toLocaleDateString()}
                        </span>
                        {lastSignIn && (
                          <span className="flex items-center gap-1">
                            <UserCircle className="w-3 h-3" />
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
