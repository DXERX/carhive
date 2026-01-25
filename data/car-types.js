import hatchback from "../public/assets/images/cars/hatchback.jpg"
import minivan from "../public/assets/images/cars/minivan.jpg"
import pickupTruck from "../public/assets/images/cars/pickup-truck.jpg"
import sedan from "../public/assets/images/cars/sedan.jpg"
import sportsCar from "../public/assets/images/cars/sports-car.jpg"
import suv from "../public/assets/images/cars/suv.jpg"

export const carTypes = [
  {
    id: "luxury-sedan",
    slug: "luxury-sedan",
    name: "Luxury Sedan",
    nameAr: "سيدان فاخرة",
    nameTr: "Lüks Sedan",
    imageUrl: sedan,
    featured: true,
  },
  {
    id: "premium-suv",
    slug: "premium-suv",
    name: "Premium SUV",
    nameAr: "دفع رباعي متميز",
    nameTr: "Premium SUV",
    imageUrl: suv,
    featured: true,
  },
  {
    id: "vip-minivan",
    slug: "vip-minivan",
    name: "VIP Minivan",
    nameAr: "ميني فان VIP",
    nameTr: "VIP Minivan",
    imageUrl: minivan,
    featured: true,
  },
  {
    id: "executive",
    slug: "executive",
    name: "Executive Class",
    nameAr: "الفئة التنفيذية",
    nameTr: "Executive Sınıfı",
    imageUrl: sedan,
    featured: true,
  },
  {
    id: "sports-car",
    slug: "sports-car",
    name: "Sports Car",
    nameAr: "سيارة رياضية",
    nameTr: "Spor Araba",
    imageUrl: sportsCar,
    featured: false,
  },
  {
    id: "hatchback",
    slug: "hatchback",
    name: "Hatchback",
    nameAr: "هاتشباك",
    nameTr: "Hatchback",
    imageUrl: hatchback,
    featured: false,
  },
  {
    id: "pickup-truck",
    slug: "pickup-truck",
    name: "Pickup Truck",
    nameAr: "شاحنة بيك آب",
    nameTr: "Pickup",
    imageUrl: pickupTruck,
    featured: false,
  },
]

export const luxuryClasses = [
  {
    id: "executive",
    name: "Executive",
    nameAr: "تنفيذي",
    nameTr: "Executive",
    description: "Top-tier luxury vehicles with premium features",
  },
  {
    id: "luxury",
    name: "Luxury",
    nameAr: "فاخر",
    nameTr: "Lüks",
    description: "High-end vehicles with exceptional comfort",
  },
  {
    id: "premium",
    name: "Premium",
    nameAr: "متميز",
    nameTr: "Premium",
    description: "Superior vehicles with enhanced features",
  },
  {
    id: "standard",
    name: "Standard",
    nameAr: "قياسي",
    nameTr: "Standart",
    description: "Quality vehicles for everyday needs",
  },
]
