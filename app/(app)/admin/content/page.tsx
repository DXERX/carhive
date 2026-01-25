import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Image, Palette, Globe } from "lucide-react"

export const metadata = {
  title: "Content Management - Admin",
  description: "Manage website content and settings",
}

export default async function AdminContentPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage website content, images, and text
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Hero Section
            </CardTitle>
            <CardDescription>Edit landing page hero content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input defaultValue="Find Your Perfect Ride" placeholder="Hero title..." />
            </div>
            <div className="space-y-2">
              <Label>Hero Subtitle</Label>
              <Textarea defaultValue="Explore our wide range of vehicles for rent" placeholder="Hero subtitle..." rows={2} />
            </div>
            <Button className="w-full">Save Hero Content</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="size-5" />
              Images
            </CardTitle>
            <CardDescription>Manage website images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed p-8 text-center">
                <Image className="text-muted-foreground mx-auto mb-3 size-12" />
                <p className="text-muted-foreground mb-3 text-sm">
                  Upload hero image, logos, or banners
                </p>
                <Button variant="outline">Upload Image</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-5" />
              Features Section
            </CardTitle>
            <CardDescription>Edit features and benefits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Feature 1</Label>
              <Input defaultValue="Wide Selection" placeholder="Feature title..." />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input defaultValue="Choose from hundreds of vehicles" placeholder="Description..." />
            </div>
            <Button className="w-full">Save Features</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="size-5" />
              SEO & Meta
            </CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input defaultValue="CarHive - Car Rental Service" placeholder="Meta title..." />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea defaultValue="Rent your perfect car with CarHive" placeholder="Meta description..." rows={2} />
            </div>
            <Button className="w-full">Save SEO Settings</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Edit the about section content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>About Title</Label>
            <Input defaultValue="About CarHive" placeholder="Title..." />
          </div>
          <div className="space-y-2">
            <Label>About Content</Label>
            <Textarea 
              defaultValue="We are a leading car rental service providing quality vehicles at affordable prices."
              placeholder="About content..." 
              rows={6}
            />
          </div>
          <Button>Save About Content</Button>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border bg-blue-50 p-4 text-blue-900">
        <p className="text-sm">
          <strong>Note:</strong> This is a placeholder content management interface. To fully implement this feature, 
          you'll need to create a database table for storing content, implement server actions, and integrate with your CMS of choice.
        </p>
      </div>
    </div>
  )
}
