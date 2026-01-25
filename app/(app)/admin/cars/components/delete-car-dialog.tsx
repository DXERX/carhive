"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { deleteCarAction } from "../actions"
import { AlertTriangle } from "lucide-react"

interface DeleteCarDialogProps {
  carId: number
  carName: string
  children: React.ReactNode
}

export function DeleteCarDialog({ carId, carName, children }: DeleteCarDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    setLoading(true)

    const result = await deleteCarAction(carId)

    setLoading(false)

    if (result.success) {
      toast({
        title: "Success",
        description: "Car deleted successfully",
      })
      setOpen(false)
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete car",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Delete Car
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{carName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Car"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
