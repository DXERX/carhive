"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Shield, ShieldOff, Ban } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { removeAdminRole, banUser, addAdminRole } from "../actions"

interface UserActionsProps {
  userId: string
  userEmail: string
  isAdmin: boolean
  currentAdmins: string[]
}

export function UserActions({ userId, userEmail, isAdmin, currentAdmins }: UserActionsProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAddAdmin = async () => {
    if (!confirm(`Grant admin role to ${userEmail}?`)) return
    
    setLoading(true)
    const result = await addAdminRole(userEmail)
    setLoading(false)

    if (result.success) {
      toast({
        title: "Admin Role Added",
        description: (result as any).message || "Admin role granted successfully",
      })
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleRemoveAdmin = async () => {
    if (!confirm(`Remove admin role from ${userEmail}?`)) return
    
    setLoading(true)
    const result = await removeAdminRole(userEmail)
    setLoading(false)

    if (result.success) {
      toast({
        title: "Admin Role Removed",
        description: (result as any).message || "Admin role removed successfully",
      })
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleBanUser = async () => {
    if (!confirm(`Ban user ${userEmail}? This action cannot be undone.`)) return
    
    setLoading(true)
    const result = await banUser(userId)
    setLoading(false)

    if (result.success) {
      toast({
        title: "User Banned",
        description: result.message,
      })
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={loading}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAdmin ? (
          <DropdownMenuItem onClick={handleRemoveAdmin} className="text-orange-600">
            <ShieldOff className="h-4 w-4 mr-2" />
            Remove Admin
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleAddAdmin}>
            <Shield className="h-4 w-4 mr-2" />
            Make Admin
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleBanUser} className="text-red-600">
          <Ban className="h-4 w-4 mr-2" />
          Ban User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
