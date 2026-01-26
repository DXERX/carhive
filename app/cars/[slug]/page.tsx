import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCarBySlug, getCars } from "@/db/queries/car-repository"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

import { Separator } from "@/components/ui/separator"
import CldImage from "@/components/cld-image"
import { CheckIcon } from "@/components/icons/check"
import { FilledStarIcon } from "@/components/icons/filled-star"
import { HeadsetIcon } from "@/components/icons/headset"
import { KidIcon } from "@/components/icons/kid"
import { NavigationIcon } from "@/components/icons/navigation"
import { WifiIcon } from "@/components/icons/wifi"

import { ReserveCard } from "./components/reserve-card"

export async function generateMetadata({
  params,
}: CarDetailsPageProps): Promise<Metadata> {
  const car = await getCarBySlug(params.slug)

  if (!car) return {}

  return {
    title: car.name,
    description: car.description,
  }
}

export async function generateStaticParams() {
  const cars = await getCars()
  return cars.map((car: any) => ({ slug: car.slug }))
}

interface CarDetailsPageProps {
  params: { slug: string }
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const car = await getCarBySlug(params.slug)

  if (!car) {
    notFound()
  }

  const locale = getLocale()
  const { carDetails, cars } = getTranslations(locale)
  const powertrainKey = car.powertrain.toLowerCase() as keyof typeof cars.powertrainLabels
  const transmissionKey = car.transmission.toLowerCase() as keyof typeof cars.transmissionLabels
  const localizedName =
    locale === "ar"
      ? (car as any).nameAr ?? car.name
      : locale === "tr"
        ? (car as any).nameTr ?? car.name
        : car.name
  const localizedDescription =
    locale === "ar"
      ? (car as any).descriptionAr ?? car.description
      : locale === "tr"
        ? (car as any).descriptionTr ?? car.description
        : car.description
  const localizedFeatures =
    locale === "ar"
      ? (car as any).featuresAr ?? car.features
      : locale === "tr"
        ? (car as any).featuresTr ?? car.features
        : car.features

  return (
    <main
      className="[--content-padding-y:32px] [--reserve-card-width:370px] md:[--content-padding-y:56px]"
      style={
        {
          "--reserve-card-top-offset":
            "calc(var(--site-header-height) + var(--content-padding-y)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-none p-0 md:max-w-[90%] xl:max-w-6xl">
        <div className="hidden md:block md:pt-8">
          <h1 className="text-balance text-2xl font-semibold">{localizedName}</h1>
        </div>
        <div className="md:pt-4">
          <div className="grid h-80 grid-cols-1 grid-rows-1 gap-3 md:h-[34rem] md:grid-cols-4 md:grid-rows-2">
            <div className="relative overflow-hidden md:col-span-3 md:row-span-2 md:rounded-l-2xl">
              <CldImage
                src={`carhive/cars/car-interior_d6nmyn`}
                alt={carDetails.imageInterior}
                priority
                fill
                sizes="66vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-1 row-span-1 hidden overflow-hidden rounded-tr-2xl md:block">
              <CldImage
                src={`carhive/cars/car-door-panel_puxkbc`}
                alt={carDetails.imageDoorPanel}
                priority
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-1 row-span-1 hidden overflow-hidden rounded-br-2xl md:block">
              <CldImage
                src={`carhive/cars/car-seat_rnzgv6`}
                alt={carDetails.imageSeat}
                priority
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-[var(--content-padding-y)]">
        <div className="mx-auto w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 xl:max-w-6xl">
          <div className="grid w-full grid-cols-1 gap-24 md:grid-cols-[1fr_auto]">
            <div className="text-balance">
              <h1 className="text-2xl font-semibold md:hidden">{localizedName}</h1>
              <div className="flex flex-wrap items-center gap-1 text-[13px] capitalize text-neutral-800 lg:text-[15px]">
                <span>{carDetails.seats.replace("{count}", String(car.seats))}</span>
                <span className="text-xl">·</span>
                <span>{cars.powertrainLabels[powertrainKey] ?? car.powertrain}</span>
                <span className="text-xl">·</span>
                <span>{cars.transmissionLabels[transmissionKey] ?? car.transmission}</span>
                {car.unlimitedMileage && (
                  <>
                    <span className="text-xl">·</span>
                    <span>{carDetails.unlimitedMileage}</span>
                  </>
                )}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-1 text-[15px] font-medium lg:text-[16px]">
                  <div className="flex items-center gap-1 ">
                    <FilledStarIcon className="inline-flex size-[15px] shrink-0" />
                    <span className=" tabular-nums">{car.rating}</span>
                  </div>
                  <span className="text-xl">·</span>
                  {Number(car.reviewCount) > 0 && (
                    <span className="text-neutral-800">
                      {carDetails.reviews.replace("{count}", String(car.reviewCount))}
                    </span>
                  )}
                </div>
              </div>

              <Separator className="my-8" />

              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-8">
                  <NavigationIcon className="size-6 shrink-0" />
                  <div className="flex flex-col">
                    <p className="font-semibold">{carDetails.amenities[0]?.title}</p>
                    <p className="mt-0.5 text-[14px] leading-5 text-neutral-600">
                      {carDetails.amenities[0]?.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8">
                  <HeadsetIcon className="size-6 shrink-0" />
                  <div className="flex flex-col">
                    <p className="font-semibold">{carDetails.amenities[1]?.title}</p>
                    <p className="mt-0.5 text-[14px] leading-5 text-neutral-600">
                      {carDetails.amenities[1]?.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8">
                  <WifiIcon className="size-6 shrink-0" />
                  <div className="flex flex-col">
                    <p className="font-semibold">{carDetails.amenities[2]?.title}</p>
                    <p className="mt-0.5 text-[14px] leading-5 text-neutral-600">
                      {carDetails.amenities[2]?.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8">
                  <KidIcon className="size-6 shrink-0" />
                  <div className="flex flex-col">
                    <p className="font-semibold">{carDetails.amenities[3]?.title}</p>
                    <p className="mt-0.5 text-[14px] leading-5 text-neutral-600">
                      {carDetails.amenities[3]?.description}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-10" />

              <div className="mt-10 space-y-6">
                <p className="text-neutral-800">{localizedDescription}</p>
              </div>

              <Separator className="my-12" />

              <h2 className="text-lg font-semibold lg:text-xl">
                {carDetails.offersTitle}
              </h2>
              <div className="pt-8">
                <div className="grid grid-cols-2 gap-4">
                  {localizedFeatures.map((feature: any) => (
                    <div
                      key={feature}
                      className="flex flex-row items-center gap-4"
                    >
                      <CheckIcon className="size-4 shrink-0 [stroke-width:2.5px]" />
                      <p className="text-neutral-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden w-[var(--reserve-card-width)] md:block">
              <div className="sticky top-[var(--reserve-card-top-offset)]">
                <ReserveCard car={car} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
