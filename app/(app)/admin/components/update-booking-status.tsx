"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateBookingStatusAction } from "../actions"

interface UpdateBookingStatusProps {
  bookingId: number
  currentStatus: string
}

export function UpdateBookingStatus({ bookingId, currentStatus }: UpdateBookingStatusProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      await updateBookingStatusAction(bookingId, newStatus)
      router.refresh()
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className={`${getStatusColor(currentStatus)} cursor-pointer inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none`}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            Pending
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("confirmed")}>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Confirmed
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Completed
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("cancelled")}>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Cancelled
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
