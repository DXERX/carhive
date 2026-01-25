"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export function AddLocationDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>
            Add a new rental location to your system
          </DialogDescription>
        </DialogHeader>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Coming Soon</p>
              <p>Location management UI is under development. For now, you can add locations by:</p>
              <ol className="list-decimal ml-4 mt-2 space-y-1">
                <li>Updating the <code className="bg-blue-100 px-1 rounded">data/locations.js</code> file</li>
                <li>Running <code className="bg-blue-100 px-1 rounded">pnpm db:seed</code> to populate the database</li>
              </ol>
            </div>
          </div>
        </div>

        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}
