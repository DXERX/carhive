"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { addAdminRole } from "../actions"
import { Badge } from "@/components/ui/badge"

interface AddAdminDialogProps {
  children: React.ReactNode
  currentAdmins: string[]
}

export function AddAdminDialog({ children, currentAdmins }: AddAdminDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await addAdminRole(email)
    setLoading(false)

    if (result.success) {
      toast({
        title: "Admin Role Added",
        description: (result as any).message || "Admin role granted successfully",
      })
      setOpen(false)
      setEmail("")
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Admin Role</DialogTitle>
          <DialogDescription>
            Add admin privileges to a user by email address
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Current Admins:</p>
          <div className="flex flex-wrap gap-2">
            {currentAdmins.map((admin) => (
              <Badge key={admin} variant="secondary">
                {admin}
              </Badge>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <p className="text-sm text-muted-foreground">
            The user must have an account to be granted admin access.
          </p>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Admin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
