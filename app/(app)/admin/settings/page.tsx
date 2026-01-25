import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Bell, Database, Shield, Globe, Mail, Zap } from "lucide-react"

export const metadata = {
  title: "Settings - Admin",
  description: "System settings and configuration",
}

export default async function AdminSettingsPage() {
  const { userId } = await auth()
  const user = await currentUser()

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
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure system settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input defaultValue="CarHive" placeholder="Site name..." />
            </div>
            <div className="space-y-2">
              <Label>Site URL</Label>
              <Input defaultValue="https://carhive.com" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@carhive.com" type="email" placeholder="support@..." />
            </div>
            <Button className="w-full">Save General Settings</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="size-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-muted-foreground text-sm">Send booking confirmations via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-muted-foreground text-sm">Send SMS for urgent updates</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Admin Alerts</Label>
                <p className="text-muted-foreground text-sm">Notify admins of new bookings</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full">Save Notification Settings</Button>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="size-5" />
              Database
            </CardTitle>
            <CardDescription>Database configuration and backup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="text-sm text-green-800">
                <strong>Status:</strong> Connected to Supabase
              </p>
            </div>
            <div className="space-y-2">
              <Label>Connection Pool Size</Label>
              <Input defaultValue="10" type="number" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-muted-foreground text-sm">Daily automated backups</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full" variant="outline">
              Test Connection
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5" />
              Security
            </CardTitle>
            <CardDescription>Security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-muted-foreground text-sm">Require 2FA for admins</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout</Label>
                <p className="text-muted-foreground text-sm">Auto-logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Session Duration (hours)</Label>
              <Input defaultValue="24" type="number" />
            </div>
            <Button className="w-full">Save Security Settings</Button>
          </CardContent>
        </Card>

        {/* API & Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-5" />
              API & Integrations
            </CardTitle>
            <CardDescription>External service integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="mb-2 flex items-center justify-between">
                <Label>Stripe (Payments)</Label>
                <Badge variant="outline">Not Connected</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Configure Stripe
              </Button>
            </div>
            <div className="rounded-lg border p-3">
              <div className="mb-2 flex items-center justify-between">
                <Label>Cloudinary (Images)</Label>
                <Badge className="bg-green-600">Connected</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Manage Cloudinary
              </Button>
            </div>
            <div className="rounded-lg border p-3">
              <div className="mb-2 flex items-center justify-between">
                <Label>Clerk (Auth)</Label>
                <Badge className="bg-green-600">Connected</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Manage Clerk
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5" />
              Email Configuration
            </CardTitle>
            <CardDescription>SMTP and email settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>SMTP Host</Label>
              <Input placeholder="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label>SMTP Port</Label>
              <Input defaultValue="587" type="number" />
            </div>
            <div className="space-y-2">
              <Label>From Email</Label>
              <Input placeholder="noreply@carhive.com" type="email" />
            </div>
            <Button className="w-full" variant="outline">
              Test Email
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="size-5" />
            Advanced Settings
          </CardTitle>
          <CardDescription>Advanced system configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Maintenance Mode</Label>
              <p className="text-muted-foreground text-sm">Disable public access for maintenance</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Debug Mode</Label>
              <p className="text-muted-foreground text-sm">Show detailed error messages</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>API Rate Limiting</Label>
              <p className="text-muted-foreground text-sm">Limit API requests per user</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border bg-blue-50 p-4 text-blue-900">
        <p className="text-sm">
          <strong>Note:</strong> This is a placeholder settings interface. To fully implement these features, 
          you'll need to create a settings table in the database and implement server actions for each setting category.
        </p>
      </div>
    </div>
  )
}
