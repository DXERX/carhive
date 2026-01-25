"use client"

import { SelectLocation } from "@/db/schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Power } from "lucide-react"
import { toggleLocationStatus } from "../actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { EditLocationDialog } from "./edit-location-dialog"

interface LocationCardProps {
  location: SelectLocation
}

export function LocationCard({ location }: LocationCardProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleToggleStatus = async () => {
    setLoading(true)
    const result = await toggleLocationStatus(location.id)
    setLoading(false)

    if (result.success) {
      toast({
        title: "Status Updated",
        description: `Location ${result.newStatus === 'active' ? 'activated' : 'deactivated'}`,
      })
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="size-5 text-blue-600" />
            {location.name}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">{location.slug}</p>
        </div>
        <Badge 
          variant={location.status === 'active' ? 'default' : 'secondary'}
          className={location.status === 'active' ? 'bg-green-600' : 'bg-gray-500'}
        >
          {location.status}
        </Badge>
      </div>

      {location.imageUrl && (
        <div className="mb-3 aspect-video overflow-hidden rounded-md bg-gray-100">
          <img 
            src={location.imageUrl} 
            alt={location.name}
            className="size-full object-cover"
          />
        </div>
      )}

      <div className="text-muted-foreground mb-3 text-sm">
        <p>Coordinates: {location.latitude}, {location.longitude}</p>
        {location.featured && (
          <Badge variant="outline" className="mt-2">
            Featured
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleToggleStatus}
          disabled={loading}
        >
          <Power className="mr-1 size-4" />
          {location.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
        <EditLocationDialog location={location} />
      </div>
    </div>
  )
}
