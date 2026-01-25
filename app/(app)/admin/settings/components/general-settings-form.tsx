"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { updateGeneralSettings } from "../actions"
import { useToast } from "@/hooks/use-toast"

interface GeneralSettingsFormProps {
  userEmail: string
  initialSettings: any
}

export function GeneralSettingsForm({ userEmail, initialSettings }: GeneralSettingsFormProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("userEmail", userEmail)

    startTransition(async () => {
      const result = await updateGeneralSettings(formData)
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
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
          <Settings className="size-5" />
          General Settings
        </CardTitle>
        <CardDescription>Basic system configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input 
              id="siteName"
              name="siteName"
              defaultValue={initialSettings.siteName} 
              placeholder="Site name..." 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteUrl">Site URL</Label>
            <Input 
              id="siteUrl"
              name="siteUrl"
              defaultValue={initialSettings.siteUrl} 
              placeholder="https://..." 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input 
              id="supportEmail"
              name="supportEmail"
              defaultValue={initialSettings.supportEmail} 
              type="email" 
              placeholder="support@..." 
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save General Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
