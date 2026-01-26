import { NextResponse } from "next/server"
import { getBrandInfo } from "@/app/(app)/admin/settings/actions"

export async function GET() {
  try {
    const brandInfo = await getBrandInfo()
    return NextResponse.json(brandInfo)
  } catch (error) {
    console.error("Error fetching brand info:", error)
    return NextResponse.json(
      { brandName: "CarHive", logoUrl: "" },
      { status: 500 }
    )
  }
}
