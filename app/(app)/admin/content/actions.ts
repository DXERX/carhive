"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { isAdminByEmail } from "@/lib/admin"

// Content storage (in production, this should be in a database)
const content: Record<string, any> = {
  heroTitle: "Find Your Perfect Ride",
  heroSubtitle: "Explore our wide range of vehicles for rent",
  feature1Title: "Wide Selection",
  feature1Description: "Choose from hundreds of vehicles",
  feature2Title: "Best Prices",
  feature2Description: "Competitive rates guaranteed",
  feature3Title: "24/7 Support",
  feature3Description: "We're here to help anytime",
  metaTitle: "CarHive - Car Rental Service",
  metaDescription: "Rent your perfect car with CarHive",
  aboutTitle: "About CarHive",
  aboutContent:
    "We are a leading car rental service providing quality vehicles at affordable prices. With years of experience in the industry, we understand what our customers need and deliver excellence in every aspect of our service.",
}

export async function updateHeroContent(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    content.heroTitle = formData.get("heroTitle") as string
    content.heroSubtitle = formData.get("heroSubtitle") as string

    revalidatePath("/admin/content")
    revalidatePath("/")
    return { success: true, message: "Hero content updated successfully" }
  } catch (error) {
    console.error("Error updating hero content:", error)
    return { success: false, error: "Failed to update hero content" }
  }
}

export async function updateFeatures(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    content.feature1Title = formData.get("feature1Title") as string
    content.feature1Description = formData.get("feature1Description") as string

    revalidatePath("/admin/content")
    revalidatePath("/")
    return { success: true, message: "Features updated successfully" }
  } catch (error) {
    console.error("Error updating features:", error)
    return { success: false, error: "Failed to update features" }
  }
}

export async function updateSEO(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    content.metaTitle = formData.get("metaTitle") as string
    content.metaDescription = formData.get("metaDescription") as string

    revalidatePath("/admin/content")
    revalidatePath("/")
    return { success: true, message: "SEO settings updated successfully" }
  } catch (error) {
    console.error("Error updating SEO:", error)
    return { success: false, error: "Failed to update SEO settings" }
  }
}

export async function updateAboutContent(formData: FormData) {
  const { userId } = await auth()
  const userEmail = formData.get("userEmail") as string

  if (!userId || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    content.aboutTitle = formData.get("aboutTitle") as string
    content.aboutContent = formData.get("aboutContent") as string

    revalidatePath("/admin/content")
    revalidatePath("/")
    return { success: true, message: "About content updated successfully" }
  } catch (error) {
    console.error("Error updating about content:", error)
    return { success: false, error: "Failed to update about content" }
  }
}

export async function getContent() {
  return content
}
