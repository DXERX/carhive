import fs from "fs/promises"
import path from "path"

const { cars } = await import("../data/cars.js")

const outDir = path.join(process.cwd(), "public", "assets", "images", "cars", "catalog")
await fs.mkdir(outDir, { recursive: true })

const manifest = {}
let count = 0

const fallbackByBodyStyle = {
  sedan: "sedan.jpg",
  suv: "suv.jpg",
  hatchback: "hatchback.jpg",
  "sports-car": "sports-car.jpg",
  "pickup-truck": "pickup-truck.jpg",
  minivan: "minivan.jpg",
}

for (const car of cars) {
  const slug = car.slug
  const fileName = `${slug}.jpg`
  const filePath = path.join(outDir, fileName)

  try {
    await fs.access(filePath)
    manifest[slug] = `/assets/images/cars/catalog/${fileName}`
    continue
  } catch {
    // file does not exist
  }

  const fallback = fallbackByBodyStyle[car.bodyStyle] || "sedan.jpg"
  const fallbackPath = path.join(process.cwd(), "public", "assets", "images", "cars", fallback)
  await fs.copyFile(fallbackPath, filePath)
  manifest[slug] = `/assets/images/cars/catalog/${fileName}`
  count++
}

await fs.writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2))
console.log(`Downloaded ${count} images.`)
