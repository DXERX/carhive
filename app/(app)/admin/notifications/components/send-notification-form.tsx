"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { sendNotification } from "../actions"

export function SendNotificationForm() {
  const [loading, setLoading] = useState(false)
  const [target, setTarget] = useState("all")
  const [type, setType] = useState("info")
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      message: formData.get("message") as string,
      target,
      type,
    }

    const result = await sendNotification(data)
    setLoading(false)

    if (result.success) {
      toast({
        title: "Notification Sent",
        description: `Notification sent to ${data.target} users`,
      })
      formRef.current?.reset()
      setTarget("all")
      setType("info")
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: (result as any).error || "Failed to send notification",
        variant: "destructive",
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Notification Title *</Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Important update"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Your notification message here..."
          rows={4}
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target">Target Audience *</Label>
          <Select value={target} onValueChange={setTarget} disabled={loading}>
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="logged-in">Logged In Users Only</SelectItem>
              <SelectItem value="admins">Admins Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={type} onValueChange={setType} disabled={loading}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send Notification"}
      </Button>
    </form>
  )
}
