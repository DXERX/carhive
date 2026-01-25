import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { checkIsAdmin } from "@/lib/admin"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1">
        {children}
      </div>
    </div>
  )
}
