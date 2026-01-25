import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { db } from "@/db"
import { locationsTable } from "@/db/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationCard } from "./components/location-card"
import { AddLocationDialog } from "./components/add-location-dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Plus } from "lucide-react"

export const metadata = {
  title: "Locations Management - Admin",
  description: "Manage rental locations",
}

export default async function AdminLocationsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const locations = await db.select().from(locationsTable).orderBy(locationsTable.name)

  const activeLocations = locations.filter((l: any) => l.status === 'active').length
  const inactiveLocations = locations.filter((l: any) => l.status === 'inactive').length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locations Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage rental locations and availability
          </p>
        </div>
        <AddLocationDialog>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Location
          </Button>
        </AddLocationDialog>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Locations</CardDescription>
            <CardTitle className="text-3xl">{locations.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-3xl text-green-600">{activeLocations}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Inactive</CardDescription>
            <CardTitle className="text-3xl text-gray-500">{inactiveLocations}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Locations Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Locations</CardTitle>
          <CardDescription>View and manage all rental locations</CardDescription>
        </CardHeader>
        <CardContent>
          {locations.length === 0 ? (
            <div className="py-12 text-center">
              <MapPin className="mx-auto mb-3 size-12 opacity-30" />
              <p className="text-muted-foreground">No locations found</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {locations.map((location: any) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
