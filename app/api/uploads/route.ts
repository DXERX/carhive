import { NextResponse } from "next/server"
import path from "path"
import { mkdir, writeFile } from "fs/promises"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "cars")
    await mkdir(uploadDir, { recursive: true })

    const uploadedUrls: string[] = []

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
      }

      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "jpg"}`
      const fileName = `${Date.now()}-${crypto.randomUUID()}${ext}`
      const filePath = path.join(uploadDir, fileName)

      await writeFile(filePath, buffer)
      uploadedUrls.push(`/uploads/cars/${fileName}`)
    }

    return NextResponse.json({ urls: uploadedUrls })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
