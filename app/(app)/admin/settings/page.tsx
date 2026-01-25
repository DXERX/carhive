import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { getSettings } from "./actions"
import { SettingsPageClient } from "./components/settings-page-client"

export const metadata = {
  title: "Settings - Admin",
  description: "System settings and configuration",
}

export default async function AdminSettingsPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const settings = await getSettings()
  const userEmail = user?.emailAddresses[0]?.emailAddress || ""

  return <SettingsPageClient settings={settings} userEmail={userEmail} />
}

