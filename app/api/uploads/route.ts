import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { mkdir, writeFile } from "fs/promises"
import crypto from "crypto"
import { logger } from "@/lib/logger"
import { handleApiRequest, validateRequestBody } from "@/lib/api-handler"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  return handleApiRequest(
    request,
    async (req) => {
      try {
        const formData = await req.formData()
        const files = formData.getAll("files") as File[]

        if (!files || files.length === 0) {
          logger.warn("No files provided in upload request", "uploads-api")
          throw new Error("No files provided")
        }

        const uploadDir = path.join(process.cwd(), "public", "uploads", "cars")
        await mkdir(uploadDir, { recursive: true })

        const uploadedUrls: string[] = []

        for (const file of files) {
          if (!file.type.startsWith("image/")) {
            logger.warn(`Invalid file type: ${file.type}`, "uploads-api")
            throw new Error("Only image files are allowed")
          }

          try {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = new Uint8Array(arrayBuffer)

            const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "jpg"}`
            const fileName = `${Date.now()}-${crypto.randomUUID()}${ext}`
            const filePath = path.join(uploadDir, fileName)

            await writeFile(filePath, buffer)
            uploadedUrls.push(`/uploads/cars/${fileName}`)
            
            logger.info(`File uploaded successfully: ${fileName}`, "uploads-api")
          } catch (fileError) {
            logger.error(`Failed to save file: ${file.name}`, "uploads-api", fileError)
            throw new Error(`Failed to save file: ${file.name}`)
          }
        }

        logger.info(`Upload completed for ${uploadedUrls.length} files`, "uploads-api")
        return { urls: uploadedUrls, count: uploadedUrls.length }
      } catch (error) {
        logger.error("Upload request failed", "uploads-api", error)
        throw error
      }
    },
    { endpoint: "/api/uploads" }
  )
}
