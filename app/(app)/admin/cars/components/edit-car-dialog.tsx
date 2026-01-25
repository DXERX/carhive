"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SelectCar } from "@/db/schema"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { updateCarAction } from "../actions"
import { CldUploadWidget } from "next-cloudinary"
import { Upload } from "lucide-react"

interface EditCarDialogProps {
  car: SelectCar
  children: React.ReactNode
}

export function EditCarDialog({ car, children }: EditCarDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(car.imageUrl || "")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const carData = {
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      description: formData.get("description") as string,
      imageUrl: imageUrl,
      pricePerDay: (parseInt(formData.get("pricePerDay") as string)).toString(),
      currency: formData.get("currency") as string,
      bodyStyle: formData.get("bodyStyle") as string,
      powertrain: formData.get("powertrain") as string,
      transmission: formData.get("transmission") as string,
      seats: parseInt(formData.get("seats") as string),
      features: (formData.get("features") as string || "").split(",").map(f => f.trim()).filter(Boolean),
      rating: parseFloat(formData.get("rating") as string).toString(),
    }

    const result = await updateCarAction(car.id, carData)

    setLoading(false)

    if (result.success) {
      toast({
        title: "Success",
        description: "Car updated successfully",
      })
      setOpen(false)
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update car",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogDescription>
            Update vehicle information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Car Name *</Label>
              <Input id="name" name="name" required defaultValue={car.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerDay">Price Per Day *</Label>
              <Input id="pricePerDay" name="pricePerDay" type="number" required defaultValue={car.pricePerDay} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" required defaultValue={car.description} rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Car Image</Label>
            <CldUploadWidget
              uploadPreset="carhive"
              options={{
                folder: "carhive/cars",
                sources: ["local", "url", "camera"],
                multiple: false,
                maxFiles: 1,
              }}
              onSuccess={(result: any) => {
                console.log("Upload success:", result)
                setImageUrl(result.info.public_id)
                toast({
                  title: "Image uploaded",
                  description: "Car image uploaded successfully",
                })
              }}
              onError={(error: any) => {
                console.error("Upload error:", error)
                toast({
                  title: "Upload failed",
                  description: error.message || "Failed to upload image. Please check your Cloudinary upload preset.",
                  variant: "destructive",
                })
              }}
            >
              {({ open }) => (
                <div className="flex gap-2">
                  <Button type="button" onClick={() => open()} variant="outline" className="w-full">
                    <Upload className="mr-2 size-4" />
                    {imageUrl !== car.imageUrl ? "Change Image" : "Upload New Image"}
                  </Button>
                  {imageUrl !== car.imageUrl && (
                    <div className="text-muted-foreground flex items-center text-sm">
                      ✓ New image selected
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
            {imageUrl && (
              <p className="text-muted-foreground text-xs">Current: {imageUrl}</p>
            )}
            <p className="text-muted-foreground text-xs">
              Upload preset: <strong>carhive</strong> (must be created in Cloudinary console as Unsigned)
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="bodyStyle">Body Style *</Label>
              <Select name="bodyStyle" required defaultValue={car.bodyStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="sports-car">Sports Car</SelectItem>
                  <SelectItem value="minivan">Minivan</SelectItem>
                  <SelectItem value="pickup-truck">Pickup Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="powertrain">Powertrain *</Label>
              <Select name="powertrain" required defaultValue={car.powertrain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission *</Label>
              <Select name="transmission" required defaultValue={car.transmission}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="seats">Seats *</Label>
              <Input id="seats" name="seats" type="number" required defaultValue={car.seats} min="2" max="9" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" defaultValue={car.currency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="TRY">TRY</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" name="rating" type="number" step="0.1" defaultValue={car.rating} min="0" max="5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input id="features" name="features" defaultValue={car.features?.join(", ")} />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
