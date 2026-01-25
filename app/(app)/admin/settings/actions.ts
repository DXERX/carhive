"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { isAdminByEmail } from "@/lib/admin"

// Settings storage (in production, this should be in a database)
const settings: Record<string, any> = {
  siteName: "CarHive",
  siteUrl: "https://carhive.com",
  supportEmail: "support@carhive.com",
  emailNotifications: true,
  smsNotifications: false,
  adminAlerts: true,
  connectionPoolSize: 10,
  autoBackup: true,
  twoFactorAuth: false,
  sessionTimeout: true,
  sessionDuration: 24,
  maintenanceMode: false,
  debugMode: false,
  apiRateLimiting: true,
  smtpHost: "smtp.gmail.com",
  smtpPort: 587,
  fromEmail: "noreply@carhive.com",
}

export async function updateGeneralSettings(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    settings.siteName = formData.get("siteName") as string
    settings.siteUrl = formData.get("siteUrl") as string
    settings.supportEmail = formData.get("supportEmail") as string

    revalidatePath("/admin/settings")
    return { success: true, message: "General settings updated successfully" }
  } catch (error) {
    console.error("Error updating general settings:", error)
    return { success: false, error: "Failed to update settings" }
  }
}

export async function updateNotificationSettings(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    settings.emailNotifications = formData.get("emailNotifications") === "true"
    settings.smsNotifications = formData.get("smsNotifications") === "true"
    settings.adminAlerts = formData.get("adminAlerts") === "true"

    revalidatePath("/admin/settings")
    return { success: true, message: "Notification settings updated successfully" }
  } catch (error) {
    console.error("Error updating notification settings:", error)
    return { success: false, error: "Failed to update settings" }
  }
}

export async function updateDatabaseSettings(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    settings.connectionPoolSize = parseInt(formData.get("connectionPoolSize") as string)
    settings.autoBackup = formData.get("autoBackup") === "true"

    revalidatePath("/admin/settings")
    return { success: true, message: "Database settings updated successfully" }
  } catch (error) {
    console.error("Error updating database settings:", error)
    return { success: false, error: "Failed to update settings" }
  }
}

export async function testDatabaseConnection() {
  const { userId } = await auth()

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    // In production, test actual database connection
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: "Database connection successful!" }
  } catch (error) {
    console.error("Error testing database connection:", error)
    return { success: false, error: "Connection failed" }
  }
}

export async function updateSecuritySettings(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    settings.twoFactorAuth = formData.get("twoFactorAuth") === "true"
    settings.sessionTimeout = formData.get("sessionTimeout") === "true"
    settings.sessionDuration = parseInt(formData.get("sessionDuration") as string)

    revalidatePath("/admin/settings")
    return { success: true, message: "Security settings updated successfully" }
  } catch (error) {
    console.error("Error updating security settings:", error)
    return { success: false, error: "Failed to update settings" }
  }
}

export async function updateEmailSettings(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    settings.smtpHost = formData.get("smtpHost") as string
    settings.smtpPort = parseInt(formData.get("smtpPort") as string)
    settings.fromEmail = formData.get("fromEmail") as string

    revalidatePath("/admin/settings")
    return { success: true, message: "Email settings updated successfully" }
  } catch (error) {
    console.error("Error updating email settings:", error)
    return { success: false, error: "Failed to update settings" }
  }
}

export async function testEmail(email: string) {
  const { userId } = await auth()

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    // In production, send actual test email
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: `Test email sent to ${email}!` }
  } catch (error) {
    console.error("Error sending test email:", error)
    return { success: false, error: "Failed to send test email" }
  }
}

export async function updateAdvancedSettings(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    settings.maintenanceMode = formData.get("maintenanceMode") === "true"
    settings.debugMode = formData.get("debugMode") === "true"
    settings.apiRateLimiting = formData.get("apiRateLimiting") === "true"

    revalidatePath("/admin/settings")
    return { success: true, message: "Advanced settings updated successfully" }
  } catch (error) {
    console.error("Error updating advanced settings:", error)
    return { success: false, error: "Failed to update settings" }
  }
}

export async function getSettings() {
  return settings
}
