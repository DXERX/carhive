"use client"

import { useRef, useState } from "react"
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
import { Upload } from "lucide-react"

interface EditCarDialogProps {
  car: SelectCar
  children: React.ReactNode
}

export function EditCarDialog({ car, children }: EditCarDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(car.imageUrl ? [car.imageUrl] : [])
  const [uploading, setUploading] = useState(false)
  const uploadedKeysRef = useRef<Set<string>>(new Set())
  const router = useRouter()
  const { toast } = useToast()

  const handleFilesUpload = async (files: File[]) => {
    if (!files.length) return

    setUploading(true)

    try {
      const formData = new FormData()
      files.forEach((file) => formData.append("files", file))

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Upload failed")
      }

      setImageUrls((prev) => {
        const uniqueNew = data.urls.filter((url: string) => !prev.includes(url))
        return [...uniqueNew, ...prev]
      })
      toast({
        title: "Images uploaded",
        description: `${data.urls.length} image(s) uploaded successfully`,
      })
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error?.message || "Failed to upload images",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const uniqueFiles: File[] = []
    const skipped: string[] = []

    files.forEach((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`
      if (uploadedKeysRef.current.has(key)) {
        skipped.push(file.name)
        return
      }
      uploadedKeysRef.current.add(key)
      uniqueFiles.push(file)
    })

    if (skipped.length) {
      toast({
        title: "Duplicate images skipped",
        description: `${skipped.length} image(s) already uploaded`,
      })
    }

    if (uniqueFiles.length) {
      await handleFilesUpload(uniqueFiles)
    }
    e.currentTarget.value = ""
  }

  const removeImage = (url: string) => {
    setImageUrls((prev) => prev.filter((item) => item !== url))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const carData = {
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      description: formData.get("description") as string,
      imageUrl: imageUrls[0] || car.imageUrl || "/assets/images/cars/sedan.jpg",
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
            <Label>Car Images</Label>
            <div className="flex flex-col gap-2">
              <input
                id="editCarImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
              <label htmlFor="editCarImages">
                <Button type="button" variant="outline" className="w-full" disabled={uploading} asChild>
                  <span>
                    <Upload className="mr-2 size-4" />
                    {uploading ? "Uploading..." : "Upload Images"}
                  </span>
                </Button>
              </label>
              {imageUrls.length > 0 && (
                <p className="text-muted-foreground text-xs">
                  First image will be used as the primary car image.
                </p>
              )}
            </div>
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {imageUrls.map((url) => (
                  <div key={url} className="group relative overflow-hidden rounded-md border">
                    <img src={url} alt="Uploaded" className="h-20 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute right-1 top-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
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
