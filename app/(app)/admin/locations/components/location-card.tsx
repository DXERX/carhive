"use client"

import { SelectLocation } from "@/db/schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Edit, Power } from "lucide-react"
import { toggleLocationStatus } from "../actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

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
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            {location.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{location.slug}</p>
        </div>
        <Badge 
          variant={location.status === 'active' ? 'default' : 'secondary'}
          className={location.status === 'active' ? 'bg-green-600' : 'bg-gray-500'}
        >
          {location.status}
        </Badge>
      </div>

      {location.imageUrl && (
        <div className="aspect-video rounded-md overflow-hidden mb-3 bg-gray-100">
          <img 
            src={location.imageUrl} 
            alt={location.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="text-sm text-muted-foreground mb-3">
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
          <Power className="h-4 w-4 mr-1" />
          {location.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </div>
    </div>
  )
}
