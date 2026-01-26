"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Upload } from "lucide-react"
import { updateBrandingSettings } from "../actions"
import { useToast } from "@/hooks/use-toast"

interface BrandingSettingsFormProps {
  userEmail: string
  initialSettings: any
}

export function BrandingSettingsForm({ userEmail, initialSettings }: BrandingSettingsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [logoPreview, setLogoPreview] = useState(initialSettings.logoUrl || "")
  const { toast } = useToast()

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoPreview(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("userEmail", userEmail)

    startTransition(async () => {
      const result = await updateBrandingSettings(formData)
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        // Reload the page to update the logo everywhere
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="size-5" />
          Branding Settings
        </CardTitle>
        <CardDescription>Customize your brand name and logo</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input 
              id="brandName"
              name="brandName"
              defaultValue={initialSettings.brandName} 
              placeholder="Your brand name..." 
              required
            />
            <p className="text-sm text-muted-foreground">
              This will be displayed throughout the application
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL (SVG/Image)</Label>
            <Input 
              id="logoUrl"
              name="logoUrl"
              value={logoPreview}
              onChange={handleLogoUrlChange}
              placeholder="https://example.com/logo.svg or data:image/svg+xml,..." 
            />
            <p className="text-sm text-muted-foreground">
              Provide a URL to your logo image (SVG recommended) or leave empty to show text-only brand name
            </p>
          </div>

          {logoPreview && (
            <div className="space-y-2">
              <Label>Logo Preview</Label>
              <div className="rounded-lg border p-4 bg-muted/30 flex items-center justify-center min-h-[80px]">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="max-h-[60px] max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div className="pt-2 space-y-2">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">💡 Tips:</p>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1 ml-4 list-disc">
                <li>SVG format recommended for best quality</li>
                <li>Use transparent backgrounds for versatility</li>
                <li>Optimal size: 200-300px width</li>
                <li>You can use Cloudinary URLs or external image URLs</li>
              </ul>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Branding Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
