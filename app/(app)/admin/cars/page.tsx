import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { checkIsAdmin } from "@/lib/admin"
import { carsTable } from "@/db/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddCarDialog } from "./components/add-car-dialog"
import { CarList } from "./components/car-list"
import { Plus } from "lucide-react"

export default async function AdminCarsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const cars = await db.select().from(carsTable).orderBy(carsTable.name)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Car Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your car fleet - add, edit, or remove vehicles
          </p>
        </div>
        <AddCarDialog>
          <Button size="lg">
            <Plus className="mr-2 size-4" />
            Add New Car
          </Button>
        </AddCarDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Cars ({cars.length})</CardTitle>
          <CardDescription>
            View and manage all vehicles in your fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CarList cars={cars} />
        </CardContent>
      </Card>
    </div>
  )
}
