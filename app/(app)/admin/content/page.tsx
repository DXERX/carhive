import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { checkIsAdmin } from "@/lib/admin"
import { getContent } from "./actions"
import { ContentPageClient } from "./components/content-page-client"

export const metadata = {
  title: "Content Management - Admin",
  description: "Manage website content and settings",
}

export default async function AdminContentPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const content = await getContent()
  const userEmail = user?.emailAddresses[0]?.emailAddress || ""

  return <ContentPageClient content={content} userEmail={userEmail} />
}
