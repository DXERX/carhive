"use client"

import { useState } from "react"
import { SelectCar } from "@/db/schema"
import CldImage from "@/components/cld-image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditCarDialog } from "./edit-car-dialog"
import { DeleteCarDialog } from "./delete-car-dialog"
import { Pencil, Trash2, DollarSign, Users, Gauge, Zap } from "lucide-react"

interface CarListProps {
  cars: SelectCar[]
}

export function CarList({ cars }: CarListProps) {
  if (cars.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No cars found. Add your first car to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <div key={car.id} className="overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
          <div className="relative h-48 bg-gray-100">
            {car.imageUrl ? (
              <CldImage
                src={car.imageUrl}
                alt={car.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center">
                No Image
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">{car.description}</p>
              </div>
            </div>

            <div className="my-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {car.bodyStyle}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {car.powertrain}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {car.transmission}
              </Badge>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <DollarSign className="text-muted-foreground size-4" />
                <span>${car.pricePerDay}/day</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="text-muted-foreground size-4" />
                <span>{car.seats} seats</span>
              </div>
            </div>

            <div className="flex gap-2">
              <EditCarDialog car={car}>
                <Button variant="outline" size="sm" className="flex-1">
                  <Pencil className="mr-1 size-4" />
                  Edit
                </Button>
              </EditCarDialog>
              <DeleteCarDialog carId={car.id} carName={car.name}>
                <Button variant="destructive" size="sm" className="flex-1">
                  <Trash2 className="mr-1 size-4" />
                  Delete
                </Button>
              </DeleteCarDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
