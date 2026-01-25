"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createCarAction } from "../actions"
import { CldUploadWidget } from "next-cloudinary"
import { Upload } from "lucide-react"

interface AddCarDialogProps {
  children: React.ReactNode
}

export function AddCarDialog({ children }: AddCarDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
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
      imageUrl: imageUrl || "carhive/cars/default_car",
      pricePerDay: (parseInt(formData.get("pricePerDay") as string)).toString(),
      currency: (formData.get("currency") as string) || "USD",
      bodyStyle: formData.get("bodyStyle") as string,
      powertrain: formData.get("powertrain") as string,
      transmission: formData.get("transmission") as string,
      seats: parseInt(formData.get("seats") as string),
      features: (formData.get("features") as string || "").split(",").map(f => f.trim()).filter(Boolean),
      rating: (parseFloat(formData.get("rating") as string) || 4.5).toString(),
      reviewCount: "0",
    }

    const result = await createCarAction(carData)

    setLoading(false)

    if (result.success) {
      toast({
        title: "Success",
        description: "Car added successfully",
      })
      setOpen(false)
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add car",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogDescription>
            Add a new vehicle to your fleet
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Car Name *</Label>
              <Input id="name" name="name" required placeholder="Tesla Model 3" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerDay">Price Per Day *</Label>
              <Input id="pricePerDay" name="pricePerDay" type="number" required placeholder="50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" required placeholder="A sleek electric sedan..." rows={3} />
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
                    <Upload className="w-4 h-4 mr-2" />
                    {imageUrl ? "Change Image" : "Upload Image"}
                  </Button>
                  {imageUrl && (
                    <div className="text-sm text-muted-foreground flex items-center">
                      ✓ Uploaded
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
            <p className="text-xs text-muted-foreground">
              Upload preset: <strong>carhive</strong> (must be created in Cloudinary console as Unsigned)
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="bodyStyle">Body Style *</Label>
              <Select name="bodyStyle" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
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
              <Select name="powertrain" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
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
              <Select name="transmission" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
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
              <Input id="seats" name="seats" type="number" required placeholder="5" min="2" max="9" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" defaultValue="USD">
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
              <Input id="rating" name="rating" type="number" step="0.1" placeholder="4.5" min="0" max="5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input id="features" name="features" placeholder="GPS, Bluetooth, Air Conditioning" />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Car"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
