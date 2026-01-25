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
      <div className="text-center py-12">
        <p className="text-muted-foreground">No cars found. Add your first car to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <div key={car.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48 bg-gray-100">
            {car.imageUrl ? (
              <CldImage
                src={car.imageUrl}
                alt={car.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Image
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg">{car.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{car.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 my-3">
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

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span>${car.pricePerDay}/day</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{car.seats} seats</span>
              </div>
            </div>

            <div className="flex gap-2">
              <EditCarDialog car={car}>
                <Button variant="outline" size="sm" className="flex-1">
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </EditCarDialog>
              <DeleteCarDialog carId={car.id} carName={car.name}>
                <Button variant="destructive" size="sm" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-1" />
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
